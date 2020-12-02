{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 //////////////////// GRAY BASEMAP \
var GRAYMAP = [\
\{   // Dial down the map saturation.\
stylers: [ \{ saturation: -100 \} ]\
\},\{ // Dial down the label darkness.\
elementType: 'labels',\
stylers: [ \{ lightness: 20 \} ],\
stylers: [ \{ visibility: 'off' \} ]\
\},\{ // Simplify the road geometries.\
featureType: 'landscape.natural',\
elementType: 'geometry',\
stylers: [ \{ visibility: 'simplified' \} ]\
\
\},\{ // Simplify the road geometries.\
featureType: 'road',\
elementType: 'geometry',\
stylers: [ \{ visibility: 'off' \} ]\
\},\{ // Turn off road labels.\
featureType: 'road',\
elementType: 'labels',\
stylers: [ \{ visibility: 'off' \} ]\
\},\{ // Turn off all icons.\
elementType: 'labels.icon',\
stylers: [ \{ visibility: 'off' \} ]\
\},\{ // Turn off all POIs.\
featureType: 'poi',\
elementType: 'all',\
stylers: [ \{ visibility: 'off' \}]\
\}\
];\
\
Map.setOptions('Gray', \{'Gray': GRAYMAP\});\
////////////////////////////////////////////////////////\
//////////////////////////////////////////////////////////////////////////\
// JRC image == 30 meter resolution\
var projection = water_image.projection()\
print(projection) // EPSG 4326\
\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM")\
\
//aoi negative for vis\
\
var aoi_negative = ee.FeatureCollection("users/laraschmitt1991/shapefiles_for_prints/OSM_india_wo_AP")\
Map.addLayer(aoi_negative.draw(\{color: 'EDEDED', strokeWidth: 0\}), \{\}, 'drawn');\
\
\
/*\
// Create an empty image into which to paint the features, cast to byte.\
var empty = ee.Image().byte();\
\
// Paint all the polygon edges with the same number and width, display.\
var outline = empty.paint(\{\
  featureCollection: aoi,\
  color: 1,\
  width: 0.2\
\});\
Map.addLayer(outline, \{palette: 'FF0000'\}, 'edges');\
\
*/\
\
var aoi_geom = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
var water_clipped = water_image.clip(aoi)\
var occurrence = water_clipped.select('occurrence')\
Map.addLayer(occurrence, \{min: 0, max: 3000, palette: ['00ffff', '00FF00']\},\
    'custom palette');\
\
//Map.addLayer(water_clipped,  \{bands: ['occurrence']\}, \{vis1\}, 'occurrence') // min: 0, max: 3000\
//Map.addLayer(aoi, \{\}, 'AOI')\
//Map.centerObject(aoi, 6)\
\
/////////////////// MASK OUT NON-VALID TRAINING AREAS OF WATER IMAGE ///////////////////////////////////////////\
\
// create occurene mask (= frequency with which water was present in the respective years)\
var water_occurence = water_clipped.select('occurrence');\
var mask_occ = water_occurence.gt(98);\
var vis3 = \{min: 1, max: 0, palette: [ 'FFFF00','008000']\};\
//Map.addLayer(mask_occ, vis3, 'mask_occ')\
\
\
// Create seasonality mask ( = 12 months to exclude paddy rice fields and areas that dry up in Rabi)\
var water_seasonality = water_clipped.select('seasonality');\
var mask_seas_lt6 = water_seasonality.lt(10);\
var mask_seas_lt6 = water_seasonality.lt(8);\
var mask_seas_lt6 = water_seasonality.lt(6);\
var mask_seas_lt4 = water_seasonality.lt(4);\
var mask_seas_lt3 = water_seasonality.lt(3);\
var mask_seas = water_seasonality.gt(6);\
var vis = \{min: 1, max: 0, palette: [ '2b428d' ,'EADEBD']\};\
Map.addLayer(mask_seas_lt6, vis, 'mask_seas_lt10')\
Map.addLayer(mask_seas_lt6, vis, 'mask_seas_lt8')\
Map.addLayer(mask_seas_lt6, vis, 'mask_seas_lt6')\
Map.addLayer(mask_seas_lt4, vis, 'mask_seas_lt4')\
Map.addLayer(mask_seas_lt3, vis, 'mask_seas_lt3')\
\
\
// create reoccurene mask (= water returns from year to year)\
var water_reccurence = water_clipped.select('recurrence');\
var mask_recc = water_reccurence.gt(99);\
var vis3 = \{min: 1, max: 0, palette: [ '008080','008000']\};\
//Map.addLayer(mask_recc, vis3, 'mask_recc')\
\
// combine the masks \
var water_seas100_occ95_recc95 = mask_occ\
              .updateMask(mask_seas)\
              .updateMask(mask_recc)\
\
\
\
\
\
\
var vis2 = \{min: 1, max: 5, palette: ['0000ff', '00FF00', '808000', '008080','008000']\};\
Map.addLayer(water_seas100_occ95_recc95, vis2, 'water')\
\
/////////////// GENERATE VECTORS (POLYGONS) OUT OF THE RASTER AREAS  //////////////////////\
\
// reduce to vectors\
var vectors_water = water_seas100_occ95_recc95.reduceToVectors(\{\
  geometry: aoi_geom,\
  crs: water_image.projection(),\
  scale: 20,\
  geometryType: 'polygon',\
  eightConnected: false,\
  labelProperty: 'zone',\
  maxPixels: 2927323055\
  //reducer: ee.Reducer.mean()\
\});\
\
// Make a display image for the vectors, add it to the map.\
var display = ee.Image(0).updateMask(0).paint(vectors_water, '000000', 3);\
//Map.addLayer(display, \{palette: '000000'\}, 'vectors_water');\
\
/////////////// SELECT ONLY LARGER WATER BODIES (TO EXCLUDE PADDY RICE FIELDS)  //////////////////////\
\
// function to get a features geometry, calculate its area and append it as a property\
var addArea = function(feature) \{\
  return feature.set(\{area_sqkm: feature.geometry().area(ee.ErrorMargin(1)).divide(1000 * 1000)\});\
\};\
\
// apply addArea function to vector feature collection\
var vectors_area_added = vectors_water.map(addArea);\
//print('vector feature collection with added area limit 100', vectors_area_added.limit(100))\
\
/*\
\
var vectors_area_added = vectors_area_added\
  // Convert 'areasqkm' property from string to number.\
  .map(function(feature)\{\
    var num = ee.Number.parse(feature.get('area_sqkm'));\
    return feature.set('area_sqkm', num);\
  \});\
\
*/\
\
// Filter to get only larger features \
var large_polys = vectors_area_added.filter(ee.Filter.gt('area_sqkm', 0.5))\
\
// Check the number of features after filtering for size\
//print('Count after filtering by size:', large_polys.size()); // 128\
\
//Map.addLayer(large_polys)\
\
\
\
}