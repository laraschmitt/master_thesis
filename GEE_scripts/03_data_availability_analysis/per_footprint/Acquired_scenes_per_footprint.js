{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Load Footprint of Landsat WRS-2 grids\
// https://developers.google.com/earth-engine/vector_datasets\
var wrs2_descending = ee.FeatureCollection('ft:1_RZgjlcqixp-L9hyS6NYGqLaKOlnhSC35AB5M5Ll');\
\
// load shapefile of Andhra Pradesh bordersand add to the map \
var aoi = ee.FeatureCollection("users/laraschmitt1991/andhra_pradesh_borders_shape").geometry()\
//Map.centerObject(aoi, 5)\
//Map.addLayer(aoi, \{\}, 'Andhra Pradesh borders')\
\
// filter wrs2_descending by Andhra Pradesh borders\
var wrs2_filtered = wrs2_descending.filterBounds(aoi);\
//print(wrs2_filtered)\
\
// load landast 8 image collection for certain calender range\
var l8_coll = ee.ImageCollection('LANDSAT/LC8_L1T_TOA');\
//filter image collection\
var l8_filtered = l8_coll\
      .filterBounds(aoi)\
      .filter(ee.Filter.calendarRange(2017,2018,'year'))\
      .filter(ee.Filter.calendarRange(1,3,'month'));\
//print(l8_filtered)\
\
// get the WRS path and row out of the metadata(properties) and\
//create a new property (combination of path row) so that it matches\
// with the property name in the wrs2_descending feauture collection\
var l8_filtered_WRSPR = l8_filtered.map(function(feature) \{\
  var path = feature.get('WRS_PATH');\
  var row = feature.get('WRS_ROW')\
  //return feature.set('WRSPR', ee.Number.parse(ee.String(path).replace('.0', '').cat('0').cat(row)))\
  //var stringRow = ee.String(row).replace('[.][0-9]+$', '');\
  //var stringPath = ee.String(path).replace('[.][0-9]+$', '');\
  \
  var stringRow = ee.String(ee.Number.parse(row).int());\
  var stringPath = ee.String(ee.Number.parse(path).int());\
  return feature.set('WRSPR', ee.Number.parse(stringPath.cat('0').cat(stringRow)));\
\});\
\
print(l8_filtered_WRSPR)\
\
// create a list of all the WRSPR values \
// aggregate_array = ggregates over a given property of the objects in a collection, \
// calculating a list of all the values of the selected property.\
var WRSPR_list = ee.List(l8_filtered_WRSPR.aggregate_array('WRSPR'));\
//print(WRSPR_list)\
\
var wrs2_filtered_with_scenecount = wrs2_filtered.map(function(feature) \{\
  var key = feature.get('WRSPR');\
  var count = WRSPR_list.filter(ee.Filter.eq('item', key)).size();\
  return feature.set('COUNT', count);\
\});\
\
print(wrs2_filtered_with_scenecount);\
\
\
// Export the FeatureCollection to a KML file.\
Export.table.toDrive(\{\
  collection: wrs2_filtered_with_scenecount,\
  description:'firsttry',\
  fileFormat: 'SHP'\
\});\
\
}