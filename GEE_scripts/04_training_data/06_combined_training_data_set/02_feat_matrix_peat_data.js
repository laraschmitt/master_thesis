{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww6700\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0  \
 /////////////////////////// import SpecTemps Composites ////////////////////////////\
var SpecTemps_Composite_2017_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644')\
var SpecTemps_Composite_2018_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
var SpecTemps_Composite_2019_jan_march_32644 = ee.Image('users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644')\
\
 /////////////////////////// import  PEAT data  ////////////////////////////\
\
var peat_allyears = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops')\
\
var peat_2017 = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops')\
                    .filter(ee.Filter.eq('year', 2017))\
print('peat_2017', peat_2017.size())\
var peat_2018 = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops')\
                    .filter(ee.Filter.eq('year', 2018))\
\
print('peat_2018', peat_2018.size())\
\
var peat_2019 = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops')\
                    .filter(ee.Filter.eq('year', 2019))\
print('peat_2019', peat_2019.size())\
\
\
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
// found later:\
// Overlay the points on the imagery to get training.\
\
/*\
var training = image.select(bands).sampleRegions(\{\
  collection: points,\
  properties: [label],\
  scale: 30\
\}) */\
\
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
\
var merged1819 = extracted_points_2018.merge(extracted_points_2019)\
var merged = extracted_points_2017.merge(extracted_points_2018).merge(extracted_points_2019)\
print('merged size', merged.size()) //37956\
\
/*\
// limit to only relevant fields\
var attributes = ee.List(["_id", "date", "accuracy", "app_name","dnn_variet", "dnn_sim", "latitude", "longitude",\
    "blue_mean", "blue_med", "blue_p10", "blue_p90",\
   "blue_std", "green_mean", "green_med", "green_p10", "green_p90", "green_std", "nir_mean",\
         "nir_med", "nir_p10", "nir_p90", "nir_std", "red_mean", "red_med", "red_p10", \
          "red_p90", "red_std", "swir1_mean", "swir1_med", "swir1_p10", "swir1_p90", "swir1_std",\
            "swir2_mean", "swir2_med", "swir2_p10", "swir2_p90", "swir2_std"]);\
\
var merged_PEAT_featcoll =merged.map(function(f)\{\
    f = ee.Feature(f);\
    return ee.Feature(null, f.toDictionary(attributes));\
 \});\
\
\
print(merged_PEAT_featcoll.first().get('_id'))\
*/\
\
\
\
/////////////////////////// generate 9 PEAT datasets ////////////////////////////\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10 = merged\
          .filter(ee.Filter.gte('dnn_sim', 0.5)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = merged\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not()))          \
          \
          \
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30 = merged\
          .filter(ee.Filter.gte('dnn_sim', 0.5)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 30),ee.Filter.eq('accuracy', 0.00).not())) \
\
 var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30 = merged\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 30),ee.Filter.eq('accuracy', 0.00).not())) \
\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100 = merged\
          .filter(ee.Filter.gte('dnn_sim', 0.5)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 100),ee.Filter.eq('accuracy', 0.00).not()))  \
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100 = merged\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 100),ee.Filter.eq('accuracy', 0.00).not())) \
          \
\
\
////////////////////// generate peat top crops /////////////////////////////////////  \
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10 = merged\
          .filter(ee.Filter.inList('dnn_variet', ['RICE', 'PEPPER', 'TOMATO', 'PEANUT', 'MAIZE', 'EGGPLANT', 'BEAN', 'GRAM', 'CUCUMBER', 'COTTON']))\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
          \
print('peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc100',\
peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10.size())\
//  2978\
\
\
\
//////////////////// generate 2017 and 2019 td sets (pre/after change to fused loc)//////////\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = extracted_points_2017\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
print('peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10',\
peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.size())\
// 1422\
\
var peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = merged1819\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
\
print('peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10',\
peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.size())\
\
// 1907          \
////////////////////////////// export them /////////////////////////////////////////////     \
          \
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10, \
 "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10", \
 "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10")\
\
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10, \
 "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10", \
 "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10")\
\
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30, \
 "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30", \
 "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30")\
\
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30, \
 "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30", \
 "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30")\
\
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100, \
 "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100", \
 "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100")\
\
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100, \
 "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100", \
 "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100")\
//top crops \
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10, \
 "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10", \
 "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10")\
  \
// 2017\
Export.table.toAsset(peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10, \
 "peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10", \
 "PEAT/peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10")\
\
// 2019\
Export.table.toAsset(peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10, \
 "peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10", \
 "PEAT/peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10")\
  \
\
    }