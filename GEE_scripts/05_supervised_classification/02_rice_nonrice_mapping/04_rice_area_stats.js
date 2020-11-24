{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // import classified maps for the different zone\
\
\
// import zones geometry\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
var north = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/north_coastal_zone').geometry()\
var krishna = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/krishna_godavari_zone').geometry()\
var scarce = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/scarce_rainfall_zone').geometry()\
var south = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/southern_zone').geometry()\
\
\
\
// import classified rice map stack\
var classified_rice_2017 = ee.Image('users/laraschmitt1991/classified_maps/rice_2017_7756')\
var classified_rice_2018 = ee.Image('users/laraschmitt1991/classified_maps/rice_2018_7756')\
var classified_rice_2019 = ee.Image('users/laraschmitt1991/classified_maps/rice_2019_7756')\
\
\
// change current_class and current_image !!!!!!!\
var geom = north\
var current_image = classified_rice_2019\
\
print(current_image)\
Map.addLayer(current_image.clip(geom), \{min: 3, max: 4, palette: ['blue', 'orange']\}, 'classified map2019');\
Map.centerObject(current_image)\
// mask image for certain band value (cropped = 1, water = 2, urban = 3, forest = 4; unswon = 5) \
//and then ee.Reducer.count for the pixel count\
\
// FUNCTION:\
var mask_func = function(image, value) \{\
  return image.updateMask(image.eq(value));\
\};\
\
//apply\
var rice_mask = mask_func(current_image, 3)\
var other_mask = mask_func(current_image, 4)\
\
var Dic_pixelcount_rice = rice_mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: geom,\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
var Dic_pixelcount_other = other_mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: geom,\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
print('Pixel counts', \
      'rice', Dic_pixelcount_rice,\
      'non_rice', Dic_pixelcount_other\
      );\
\
\
//////////////// AREA STATS SKM ////////////////////////////\
var area = ee.Image.pixelArea().divide(1000 * 1000)\
\
//rice\
var value_Image = current_image.eq(3)  \
var areaImage = value_Image.multiply(ee.Image.pixelArea().divide(1000 * 1000));\
\
// Sum the values \
var stats = areaImage.reduceRegion(\{\
  reducer: ee.Reducer.sum(),\
  geometry: geom,\
  scale: 30,\
  maxPixels: 1e9\
\});\
print(' representing rice area: ', stats.get('classification'), 'square km');\
\
\
// other\
var value_Image = current_image.eq(4)  \
var areaImage = value_Image.multiply(ee.Image.pixelArea().divide(1000 * 1000));\
\
// Sum the values \
var stats = areaImage.reduceRegion(\{\
  reducer: ee.Reducer.sum(),\
  geometry: geom,\
  scale: 30,\
  maxPixels: 1e9\
\});\
print(' representing other crop area: ', stats.get('classification'), 'square km');\
\
}