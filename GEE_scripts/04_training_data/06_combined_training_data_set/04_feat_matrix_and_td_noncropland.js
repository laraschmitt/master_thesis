{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15140\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // What I want: shape file should have columns:\
//ee. Feature.set(\'91id\'92,1)\
//training_point_id, class (from 1-5: 1urban, 2forest, 3water, \
//gradient bare_land to 4grasslands, 5agriculture) \
// binary_class (0 for not cropped, 1 for cropped area), latitude, longitude \
\
//What I need for the random forest:\
//Table with:\
// Class (0 or 1) and extract pixel value of my 3029 composite at training point location \
\
\
////////////////////////////////////////\
\
// import datasets from assets & set columns/properties: \
\
//////////////////// WATER ////////////////////////////////////////////////\
var water_points = ee.FeatureCollection("users/laraschmitt1991/water/water_points_800")    /// !!!\
\
// set id properties for water \
var water_points = water_points.map(function(feature) \{\
  return feature.set(\{class_name: 'water', class_id: 2, binary_id: 2\})\
  \});\
\
\
/*\
var water_points = water_points\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(300)  */\
  \
print('water', water_points.size())   // \
\
//2nd way to set properties without dict\
//var sec = collection.map(function(f) \{\
//      return f.set('class_id',1).set('class_binary', 0) \});\
\
Map.addLayer(water_points, \{color: '005eff'\}, 'water_blue')\
\
//////////////////// URBAN ////////////////////////////////////////////////\
var urban_points = ee.FeatureCollection("users/laraschmitt1991/urban/urban_points_800")    /// !!!\
// set id properties for water \
var urban_points = urban_points.map(function(feature) \{\
  return feature.set(\{class_name: 'urban', class_id: 3, binary_id: 2\})\
  \});\
\
\
/*\
var urban_points = urban_points\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(300)    */\
  \
print('urban', urban_points.size())  // \
Map.addLayer(urban_points, \{color: 'FF0000'\}, 'urban_red')\
\
\
//////////////////// FOREST ////////////////////////////////////////////////\
var forest_points = ee.FeatureCollection("users/laraschmitt1991/forest/forest_points_800")    /// !!!\
\
// set id properties for forest \
var forest_points = forest_points.map(function(feature) \{\
  return feature.set(\{class_name: 'forest', class_id: 4, binary_id: 2\})\
  \});\
  \
  \
/*  \
var forest_points = forest_points\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(300)   */\
  \
print('forest', forest_points.size())  // \
Map.addLayer(forest_points, \{color: '22ff00'\}, 'forest_green')\
\
\
/////////////////////////////////////////////////////////////\
\
// merge urban, water and forest datasets to one collection \
var points_urban_water_forest = urban_points.merge(water_points).merge(forest_points)\
print('points_urban_water_forest', points_urban_water_forest.limit(10))\
\
\
\
 ///////////////// extract pixel values from spectemps at point location for each year ////////////////////////////\
\
 /////////////////////////// import SpecTemps Composites ////////////////////////////\
var SpecTemps_Composite_2017_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644')\
var SpecTemps_Composite_2018_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
var SpecTemps_Composite_2019_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
\
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
var points_urban_water_forest_2017 = points_urban_water_forest\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2017_jan_march_32644);\
  return feature.set(extracted)\
\});\
\
var points_urban_water_forest_2018 = points_urban_water_forest\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2018_jan_march_32644);\
  return feature.set(extracted)\
\});\
\
var points_urban_water_forest_2019 = points_urban_water_forest\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2019_jan_march_32644);\
  return feature.set(extracted) \
\});\
\
\
\
/////////////////////////////////////////////////////////////\
// COMBINE WITH EXTRACTED VALUES FOR BARELAND \
\
// import bareland feat matrix           /////////////////// CHANGE TO 350, 700 and 800 \
var td_bareland = ee.FeatureCollection("users/laraschmitt1991/bareland/td_bareland_800")  /// !!!  /// !!! /// !!!\
\
/*\
var td_bareland = td_bareland\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(300)    */\
  \
\
\
// MERGE with OTHER FEAT MATRIX\
var td_urban_water_forest_bareland_2017 = points_urban_water_forest_2017.merge(td_bareland)\
print('size',td_urban_water_forest_bareland_2017.size() )\
\
var td_urban_water_forest_bareland_2018 = points_urban_water_forest_2018.merge(td_bareland)\
print('size',td_urban_water_forest_bareland_2018.size() )\
\
var td_urban_water_forest_bareland_2019 = points_urban_water_forest_2019.merge(td_bareland)\
print('size',td_urban_water_forest_bareland_2019.size() )\
\
\
\
// export, runtime ///////////////////////// CHANGE TO 1200, 2800, 3200\
Export.table.toAsset(\
  td_urban_water_forest_bareland_2017, \
  "td_noncropped_3200_2017",  /// !!!\
  "training_data/single_noncropped/td_noncropped_3200_2017");  /// !!!  /// !!!\
\
Export.table.toAsset(\
  td_urban_water_forest_bareland_2018, \
  "td_noncropped_3200_2018",  /// !!!\
  "training_data/single_noncropped/td_noncropped_3200_2018");   /// !!! /// !!!\
  \
Export.table.toAsset(\
  td_urban_water_forest_bareland_2019, \
  "td_noncropped_3200_2019", ///// !!\
  "training_data/single_noncropped/td_noncropped_3200_2019");  /// !!!  /// !!!\
\
Export.table.toDrive(td_urban_water_forest_bareland_2019)\
\
var relevant_props = ee.List([\
            'class_name', 'class_id', 'binary_id',\
            'blue_med', 'green_med', 'red_med', 'nir_med', 'swir1_med', 'swir2_med',\
            'blue_std', 'green_std', 'red_std', 'nir_std', 'swir1_std', 'swir2_std',\
            'blue_p90', 'green_p90', 'red_p90', 'nir_p90', 'swir1_p90', 'swir2_p90',\
            'blue_p10', 'green_p10', 'red_p10', 'nir_p10', 'swir1_p10', 'swir2_p10',\
            'blue_mean', 'green_mean', 'red_mean', 'nir_mean', 'swir1_mean', 'swir2_mean'\
              ]);\
}