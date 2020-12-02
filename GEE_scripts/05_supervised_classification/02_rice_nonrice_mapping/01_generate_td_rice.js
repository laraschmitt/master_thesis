{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0  \
 /////////////////////////// import SpecTemps Composites ////////////////////////////\
var SpecTemps_Composite_2017_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644')\
var SpecTemps_Composite_2018_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
var SpecTemps_Composite_2019_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
\
 /////////////////////////// import yearly PEAT data  ////////////////////////////\
\
var peat = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops')\
\
\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE = peat\
          .filter(ee.Filter.gte('rice_crop', 'RICE')) \
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE.size()) // 886 PLANTIX & GATHERIX\
\
\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_GATH = peat\
          .filter(ee.Filter.gte('rice_crop', 'RICE')) \
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.eq('app_name', 'Gatherix'))\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_GATH.size()) // 35  GATHERIX\
\
\
\
\
\
/////////////////////////////////////////////\
\
\
\
\
\
\
\
\
\
var peat_2017 = peat.filter(ee.Filter.eq('year', 2017))\
var peat_2018 = peat.filter(ee.Filter.eq('year', 2018))\
var peat_2019 = peat.filter(ee.Filter.eq('year', 2019))\
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
// apply to feature collections and sepctemps\
// a mapped algorithm must return a Feature or Image -> solution: set a property\
// put image name for image = \
\
var extracted_points_2017 = peat_2017\
  .map(function(feature)\{\
  //var binary_id = feature.get('class_name');\
  var extracted = extract(feature, SpecTemps_Composite_2017_jan_march_32644);\
  return feature.set(extracted) //.set('binary_id', binary_id);\
\});\
\
var extracted_points_2018 = peat_2018\
  .map(function(feature)\{\
  //var binary_id = feature.get('class_name');\
  var extracted = extract(feature, SpecTemps_Composite_2018_jan_march_32644);\
  return feature.set(extracted) //.set('binary_id', binary_id);\
\});\
\
var extracted_points_2019 = peat_2019\
  .map(function(feature)\{\
  //var binary_id = feature.get('class_name');\
  var extracted = extract(feature, SpecTemps_Composite_2019_jan_march_32644);\
  return feature.set(extracted) //.set('binary_id', binary_id);\
\});\
\
/////////////////////////// merge to one big feature collection  ////////////////////////////\
\
var merged = extracted_points_2017.merge(extracted_points_2018).merge(extracted_points_2019)\
print('merged size', merged.size()) //37956\
print('merged size', merged.limit(10)) \
/////////// generate training  dataset ////////////////////////////\
// idea: split up in gatherix and plantix and use gatherix as validation\
// does not work: only 48 datapoint for RICE from gatherix with high acc (10m)\
// .filter(ee.Filter.eq('app_name', 'Gatherix')) \
\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE = merged\
          .filter(ee.Filter.gte('rice_crop', 'RICE')) \
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE.size()) // 886\
\
\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_GATH = merged\
          .filter(ee.Filter.gte('rice_crop', 'RICE')) \
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.eq('app_name', 'Gatherix'))\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_GATH.size()) // 886\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER = merged\
          .filter(ee.Filter.gte('rice_crop', 'OTHER')) \
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER.size()) // 3329\
\
\
\
// function to create new properties for the classes\
var set_rice_props = function(feature) \{\
  return feature.set(\{bin_rice_crop: 3\})\
  \};\
  \
var set_other_props = function(feature) \{\
  return feature.set(\{bin_rice_crop: 4\})\
  \};\
  \
\
// set training column \
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE =  \
    peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE.map(set_rice_props)\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER = \
    peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER.map(set_other_props)\
// IMPORT and ADD COLUMN  \
  \
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE.limit(5))\
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER.limit(5))\
\
\
\
// select 800 points randomly out of each dataset \
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE\
        = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(800)\
                    \
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER\
        = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(800)                    \
// merge\
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_OTHER =\
  td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE\
  .merge(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_OTHER)\
\
print(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_OTHER.size())\
// size 1600 \
\
//export \
Export.table.toAsset(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_OTHER, \
 "td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_RICE_OTHER", \
 "training_data/td_peat_800_RICE_800_OTHER_dnn80_acc10")\
    }