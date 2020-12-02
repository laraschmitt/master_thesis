{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // import PEAT point dataset from assets (PEAT_aoi)\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2017_aoi_time_uloc_ff_nourban_noroads")\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2018_aoi_time_uloc_ff_nourban_noroads")\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2019_aoi_time_uloc_ff_nourban_noroads")\
\
// merge\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall = peat_2017_aoi_time_uloc_ff_nourban_noroads.merge(\
  peat_2018_aoi_time_uloc_ff_nourban_noroads).merge\
  (peat_2019_aoi_time_uloc_ff_nourban_noroads)\
////////////////////////// SET FILTERS //////////////////////////////////////\
\
// function to get a list of all non-tree crops per year\
var get_non_tree_var = function(feat_coll) \{\
    // define potential croplist\
    var pot_tree_ornam_list = ee.List(['ADDITIONAL', 'ALMOND', 'APPLE', 'APRICOT','BANANA', 'CITRUS', 'CHERRY', 'GUAVA', 'MANGO',\
                  'OLIVE', 'ORNAMENTAL', 'PAPAYA', 'PEAR', 'PEACH', 'PISTACHIO', 'PLUM', 'POMEGRANATE'])\
    \
    var hist = feat_coll.aggregate_histogram('dnn_variet')\
    var dict = ee.Dictionary(hist)\
    //print(dict.size())\
    // check if tree crops are included in the crophistogram of that year\
    \
    var dict_wo_trees = dict.remove(pot_tree_ornam_list, true)\
    var keys = dict_wo_trees.keys()\
    //print(keys)\
    var values = dict_wo_trees.values()\
    var combined = keys.zip(values)\
    print ('combined', combined)\
    // SORTING DOES NOT WORK IF LIST OF LIST HAS NON-UNIQUE VALUES \
    //var sorted = combined.sort(values)\
    //var croplist_wo_trees = sorted\
   //   .map(function(v)\{ return ee.List(v).get(0) \})\
    \
    return keys\
    \
  \}   \
\
//////////////////////////////////////////////\
\
//  get croplist ofr all potential non-tree varieties \
var croplist = get_non_tree_var(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall) \
\
// filter data with non-tree croplist\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall\
          .filter(ee.Filter.inList('dnn_variet', croplist))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall\
          .filter(ee.Filter.inList('dnn_variet', croplist))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall\
          .filter(ee.Filter.inList('dnn_variet', croplist))\
          \
/*          \
print('peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops.size(),  //  4767\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops.size(), //  33485\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops.size()) //  28951\
*/\
\
\
Export.table.toAsset(peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops, "peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops", "PEAT/peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops")\
Export.table.toAsset(peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops, "peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops", "PEAT/peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops")\
Export.table.toAsset(peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops, "peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops", "PEAT/peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops")\
\
\
// maybe: only the first ten // from theo \
//var sliced = sorted\
//  .slice(sorted.size().subtract(10), sorted.size())\
//  .map(function(v)\{ return ee.List(v).get(0) \})\
\
//print(sliced) \
\
// old filter: Crops (for 2019)\
// list of top crops (more than 500 points per crop; see Python script)\
//var crops = ee.List(['PEPPER', 'RICE', 'COTTON', 'MAIZE', 'BEAN', 'TOMATO',\
  //            'EGGPLANT', 'CUCUMBER', 'PEANUT', 'CHICKPEA', 'GRAM', 'SOYBEAN', 'WHEAT',\
    //         'SUGARCANE', 'SORGHUM', 'MILLET'])\
\
\
// filter : DNN results\
// make 2 filtersteps:\
//1) more than 0.60\
//2) more than 0.70 \
//3) more than 0.80\
\
////////////////////////// FILTER: DNN THRESHOLDS / CROPNET   ( ONLY FOR STATS TABLE) //////////////////////////////////////\
//2017\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60 = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.6))\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70 = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.7))\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80 = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.8))\
\
print('DNN THRESHOLDS 2017', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80.size())\
\
//2018\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60 = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.6))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70 = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.7)) \
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80 = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
          \
print('DNN THRESHOLDS 2018', 'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60.size(), \
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70.size(),\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80.size())\
\
// 2019 \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60 = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.6)) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70 = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.7)) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80 = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.8)) \
\
print('DNN THRESHOLDS 2019','peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn70.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80.size())\
\
////////////////////////// FILTER: ANDROID ACCURACY //////////////////////////////////////\
//////////////// PLANTIX AND GATHERIX //////////////////////////////////\
// make crop net testing stricter 77 // lte = less or equal\
// have to exclude all accuracy = 0.00 \
\
//////////////// 2017////////////////////////////////////\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10 = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.lte('accuracy', 10)) // 8043   \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30 = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 30),ee.Filter.eq('accuracy', 0.00).not()))       \
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100 = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 100),ee.Filter.eq('accuracy', 0.00).not())) \
\
print('GPS ACC 2017','peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100.size())\
\
//////////////// 2018////////////////////////////////////\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10 = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.lte('accuracy', 10)) // 8043   \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30 = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 30),ee.Filter.eq('accuracy', 0.00).not()))       \
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100 = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 100),ee.Filter.eq('accuracy', 0.00).not())) \
\
print('GPS ACC 2018', 'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10.size(),\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30.size(),\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100.size())\
\
//////////////// 2019////////////////////////////////////\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10 = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.lte('accuracy', 10)) // 8043   \
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not())) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30 = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 30),ee.Filter.eq('accuracy', 0.00).not())) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100 = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 100),ee.Filter.eq('accuracy', 0.00).not())) \
\
print('GPS ACC 2019', 'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100.size())\
\
\
/////////////////// SPLIT UP IN PLANTIX and GATHERIX //////////////////////////\
// change zum fused location provider: august 2017\
// also all 2017 are safe:\
// combine 2017 dataset with only gatherix from 2018 and 2019 \
\
/////////////////// 2017 /////////////////////////\
//plantix\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
\
//gatherix\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
\
print('2017 PLANTIX SHARES', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix.size())\
\
print('2017 GATHERIX SHARES', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix.size(),\
'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix.size())\
\
/////////////////// 2018 /////////////////////////\
//plantix\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
\
//gatherix\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix = peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
\
print('2018 PLANTIX SHARES', 'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix.size(),\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix.size(),\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix.size())\
\
print('2018 GATHERIX SHARES', 'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix.size(),\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix.size(),\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix.size())\
\
/////////////////// 2019 /////////////////////////\
//plantix\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100\
          .filter(ee.Filter.inList('app_name', ee.List(['Plantix', 'Plantix Preview', 'Plantix Internal', 'com.peat.GartenBank']))) \
\
//gatherix\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix = peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100\
          .filter(ee.Filter.inList('app_name', ee.List(['Gatherix']))) \
\
print('2019 PLANTIX SHARES', 'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_plantix.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_plantix.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_plantix.size())\
\
print('2019 GATHERIX SHARES', 'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc10_gatherix.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc30_gatherix.size(),\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn60_acc100_gatherix.size())\
}