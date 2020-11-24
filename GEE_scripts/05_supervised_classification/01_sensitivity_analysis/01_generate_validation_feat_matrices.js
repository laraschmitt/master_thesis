{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // import reference points dataset\
\
var ref = ee.FeatureCollection('users/laraschmitt1991/validation_data/reference_points_complete')\
\
 \
var ref_2017 = ref.map(function(feat) \{\
  return feat.select(\
      ['2017_ref', 'classifica', 'field6', 'latitude', 'longitude', 'zone_name'], \
      ['class_id', 'classifica', 'field6', 'latitude', 'longitude', 'zone_name'])\
  \
\});\
\
print(ref_2017)\
\
var ref_2018 = ref.map(function(feat) \{\
  return feat.select(\
      ['2018_ref', 'classifica', 'field6', 'latitude', 'longitude', 'zone_name'], \
      ['class_id', 'classifica', 'field6', 'latitude', 'longitude', 'zone_name'])\
  \
\});\
\
print(ref_2018)\
\
\
var ref_2019 = ref.map(function(feat) \{\
  return feat.select(\
      ['2019_ref', 'classifica', 'field6', 'latitude', 'longitude', 'zone_name'], \
      ['class_id', 'classifica', 'field6', 'latitude', 'longitude', 'zone_name'])\
  \
\});\
\
print(ref_2019)\
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
var ref_feat_2017 = ref_2017\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2017_jan_march_32644);\
  return feature.set(extracted)\
\});\
\
// apply to feature collections and sepctemps\
var ref_feat_2018 = ref_2018\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2018_jan_march_32644);\
  return feature.set(extracted)\
\});\
\
// apply to feature collections and sepctemps\
var ref_feat_2019 = ref_2019\
  .map(function(feature)\{\
  var extracted = extract(feature, SpecTemps_Composite_2019_jan_march_32644);\
  return feature.set(extracted)\
\});\
\
print(ref_feat_2019.limit(2))\
\
\
// export to assets\
Export.table.toAsset(\
  ref_feat_2017, \
  'ref_feat_2017', \
  'users/laraschmitt1991/validation_data/ref_feat_2017')\
\
Export.table.toAsset(\
  ref_feat_2018, \
  'ref_feat_2018', \
  'users/laraschmitt1991/validation_data/ref_feat_2018')\
\
Export.table.toAsset(\
  ref_feat_2019, \
  'ref_feat_2019', \
  'users/laraschmitt1991/validation_data/ref_feat_2019')\
\
\
// filter for zones\
var scarce_ref_feat_2017 = ref_feat_2017.filter(ee.Filter.eq('zone_name', 'scarce')) \
var scarce_ref_feat_2018 = ref_feat_2018.filter(ee.Filter.eq('zone_name', 'scarce')) \
var scarce_ref_feat_2019 = ref_feat_2019.filter(ee.Filter.eq('zone_name', 'scarce')) \
print(scarce_ref_feat_2019.size())\
\
Export.table.toAsset(\
  scarce_ref_feat_2017, \
  'scarce_ref_feat_2017', \
  'users/laraschmitt1991/validation_data/scarce_ref_feat_2017')\
\
Export.table.toAsset(\
  scarce_ref_feat_2018, \
  'scarce_ref_feat_2018', \
  'users/laraschmitt1991/validation_data/scarce_ref_feat_2018')\
\
Export.table.toAsset(\
  scarce_ref_feat_2019, \
  'scarce_ref_feat_2019', \
  'users/laraschmitt1991/validation_data/scarce_ref_feat_2019')\
\
\
\
var north_coas_ref_feat_2017 = ref_feat_2017.filter(ee.Filter.eq('zone_name', 'north_coas')) \
var north_coas_ref_feat_2018 = ref_feat_2018.filter(ee.Filter.eq('zone_name', 'north_coas')) \
var north_coas_ref_feat_2019 = ref_feat_2019.filter(ee.Filter.eq('zone_name', 'north_coas'))\
print(north_coas_ref_feat_2019.size())\
\
Export.table.toAsset(\
  north_coas_ref_feat_2017, \
  'north_coas_ref_feat_2017', \
  'users/laraschmitt1991/validation_data/north_coas_ref_feat_2017')\
\
Export.table.toAsset(\
  north_coas_ref_feat_2018, \
  'north_coas_ref_feat_2018', \
  'users/laraschmitt1991/validation_data/north_coas_ref_feat_2018')\
\
Export.table.toAsset(\
  north_coas_ref_feat_2019, \
  'north_coas_ref_feat_2019', \
  'users/laraschmitt1991/validation_data/north_coas_ref_feat_2019')\
\
\
\
\
var southern_ref_feat_2017 = ref_feat_2017.filter(ee.Filter.eq('zone_name', 'southern')) \
var southern_ref_feat_2018 = ref_feat_2018.filter(ee.Filter.eq('zone_name', 'southern')) \
var southern_ref_feat_2019 = ref_feat_2019.filter(ee.Filter.eq('zone_name', 'southern'))\
print(southern_ref_feat_2019.size())\
\
Export.table.toAsset(\
  southern_ref_feat_2017, \
  'southern_ref_feat_2017', \
  'users/laraschmitt1991/validation_data/southern_ref_feat_2017')\
\
Export.table.toAsset(\
  southern_ref_feat_2018, \
  'southern_ref_feat_2018', \
  'users/laraschmitt1991/validation_data/southern_ref_feat_2018')\
\
Export.table.toAsset(\
  southern_ref_feat_2019, \
  'southern_ref_feat_2019', \
  'users/laraschmitt1991/validation_data/southern_ref_feat_2019')\
\
\
\
\
\
\
var krishna_ref_feat_2017 = ref_feat_2017.filter(ee.Filter.eq('zone_name', 'krishna')) \
var krishna_ref_feat_2018 = ref_feat_2018.filter(ee.Filter.eq('zone_name', 'krishna')) \
var krishna_ref_feat_2019 = ref_feat_2019.filter(ee.Filter.eq('zone_name', 'krishna'))\
print(krishna_ref_feat_2019.size())\
\
\
\
Export.table.toAsset(\
  krishna_ref_feat_2017, \
  'krishna_ref_feat_2017', \
  'users/laraschmitt1991/validation_data/krishna_ref_feat_2017')\
\
Export.table.toAsset(\
  krishna_ref_feat_2018, \
  'krishna_ref_feat_2018', \
  'users/laraschmitt1991/validation_data/krishna_ref_feat_2018')\
\
Export.table.toAsset(\
  krishna_ref_feat_2019, \
  'krishna_ref_feat_2019', \
  'users/laraschmitt1991/validation_data/krishna_ref_feat_2019')\
\
\
\
\
\
\
/*\
// split up intro three by removing // rename to "binary_id" and "class_id"\
\
// Generic Function to remove a property from a feature\
var removeProperty = function(feat, property) \{\
  var properties = feat.propertyNames()\
  var selectProperties = properties.filter(ee.Filter.neq('item', property))\
  return feat.select(selectProperties)\
\}\
\
\
// remove a list of properties\
var selectPropList = function(feat, proplist) \{\
  var properties = feat.propertyNames()\
  var selectProperties = properties.filter(ee.Filter.inList('item', proplist))\
  return feat.select(selectProperties)\
\}\
\
var ref_2017 = ref.map(function(feat) \{\
  return selectPropList(feat, ['2017_ref', 'classifica', 'field6', 'latitude', 'longitude', 'zone_name'])\
\})\
*/\
}