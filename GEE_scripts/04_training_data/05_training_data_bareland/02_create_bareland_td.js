{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
// import whole dataset\
var bareland_allyears = ee.FeatureCollection('users/laraschmitt1991/bareland/tp_baresoil_val_NDVI_420')\
print(bareland_allyears.limit(5))\
\
\
// all uncropped in all years!! \
\
//split up datasets by years\
var bareland_2017 = bareland_allyears    // .filter(ee.Filter.eq('year', 2017))\
var bareland_2018 = bareland_allyears    //.filter(ee.Filter.eq('year', 2018))\
var bareland_2019 = bareland_allyears    //.filter(ee.Filter.eq('year', 2019))\
\
print('bareland_2017 size', bareland_2017.size()) // 245  -> 200\
print('bareland_2018 size', bareland_2018.size())  // 202 -> 200\
print('bareland_2019 size', bareland_2019.size())  //967  -> 400\
\
// 1000 - 245  - 202 = 553\
\
// randomly select 200 respec 200  points from baresoil:\
var bareland_2017  = bareland_2017\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(200)\
print('bareland_2017_ size',bareland_2017.size())\
\
\
var bareland_2018  = bareland_2018\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(300)\
print('bareland_2018_ size',bareland_2018.size())\
\
\
\
var bareland_2019  = bareland_2019\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(300)\
print('bareland_2019_ size',bareland_2019.size()) \
\
\
// ADD  CLASS PROPERTY COLUMNS \
\
\
// set id properties for baresoil \
var bareland_2017 = bareland_2017.map(function(feature) \{\
  return feature.set(\{class_name: 'bareland', class_id: 5, binary_id: 2\})\
  \});\
\
var bareland_2018 = bareland_2018.map(function(feature) \{\
  return feature.set(\{class_name: 'bareland', class_id: 5, binary_id: 2\})\
  \});\
\
var bareland_2019 = bareland_2019.map(function(feature) \{\
  return feature.set(\{class_name: 'bareland', class_id: 5, binary_id: 2\})\
  \});\
\
// EXTRACT VALUES PER YEAR \
 /////////////////////////// import SpecTemps Composites ////////////////////////////\
var SpecTemps_Composite_2017_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644')\
var SpecTemps_Composite_2018_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
var SpecTemps_Composite_2019_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
\
 ///////////////// extract pixel values from spectemps at point location for each year ////////////////////////////\
\
// combined function: get geometry and extract pixel value:\
var extract = function(feature, image)\{\
  var geom = feature.geometry()\
  var dict = image.reduceRegion(\{\
  reducer: ee.Reducer.mean(),\
  geometry: geom,\
  scale: 30\});\
  return dict\
\}\
\
\
// apply to feature collections and sepctemps\
var extracted_points_2017 = bareland_2017\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2017_jan_march_32644);\
  return feature.set(extracted)\
\});\
\
var extracted_points_2018 = bareland_2018\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2018_jan_march_32644);\
  return feature.set(extracted)\
\});\
\
var extracted_points_2019 = bareland_2019\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2019_jan_march_32644);\
  return feature.set(extracted) \
\});\
\
\
////////////////////////////////////\
// merge datasets\
var td_bareland = extracted_points_2017.merge(extracted_points_2018).merge(extracted_points_2019)\
print('size', td_bareland.size())\
\
// EXPORT\
Export.table.toAsset(td_bareland, "td_bareland_800", "bareland/td_bareland_800")\
\
}