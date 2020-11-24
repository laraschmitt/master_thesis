{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // import PEAT point dataset from assets (aoi_time_uloc_ff_nourban_noroads)\
var peat_2017_aoi_time_uloc_ff_nourban_noroads = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2017_aoi_time_uloc_ff_nourban_noroads")\
var peat_2018_aoi_time_uloc_ff_nourban_noroads = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2018_aoi_time_uloc_ff_nourban_noroads")\
var peat_2019_aoi_time_uloc_ff_nourban_noroads = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2019_aoi_time_uloc_ff_nourban_noroads")\
// print sizes 59514\
print('peat_2017_aoi_time_uloc_ff_nourban_noroads' ,peat_2017_aoi_time_uloc_ff_nourban_noroads.size(), // 2769\
'peat_2018_aoi_time_uloc_ff_nourban_noroads', peat_2018_aoi_time_uloc_ff_nourban_noroads.size(),  // 28117\
'peat_2019_aoi_time_uloc_ff_nourban_noroads', peat_2019_aoi_time_uloc_ff_nourban_noroads.size()) // 20645\
\
// Merge points together\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads = \
        peat_2017_aoi_time_uloc_ff_nourban_noroads\
        .merge(peat_2018_aoi_time_uloc_ff_nourban_noroads)\
        .merge(peat_2019_aoi_time_uloc_ff_nourban_noroads);\
        \
print(peat_allyears_aoi_time_uloc_ff_nourban_noroads.size()) //51531\
\
\
/////////////////////////////// FILTER HERE FOR PLANTIX ONLY TO GET THE COUNTS ////////////////////\
\
\
// plantix share 2017:\
/*\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads = peat_allyears_aoi_time_uloc_ff_nourban_noroads\
                    .filter(ee.Filter.eq('app_name','Plantix'))  */\
\
\
////////////////////////// EXCLUDE IMAGES FROM GALLERY //////////////////////////////////////\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall = peat_allyears_aoi_time_uloc_ff_nourban_noroads\
          .filter(ee.Filter.eq('image_from', 'not'));\
print('peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall', peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall.size())\
// 51531\
\
// split up in years\
var peat_2017_aoi_time_uloc_ff_nourban_noroads = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall\
        .filter(ee.Filter.eq('year', 2017))\
\
var peat_2018_aoi_time_uloc_ff_nourban_noroads = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall\
        .filter(ee.Filter.eq('year', 2018))\
\
var peat_2019_aoi_time_uloc_ff_nourban_noroads = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall\
        .filter(ee.Filter.eq('year', 2019))\
\
print('peat_2017_aoi_time_uloc_ff_nourban_noroads', peat_2017_aoi_time_uloc_ff_nourban_noroads.size(), // 2769\
'peat_2018_aoi_time_uloc_ff_nourban_noroads', peat_2018_aoi_time_uloc_ff_nourban_noroads.size(),  // 28117\
'peat_2019_aoi_time_uloc_ff_nourban_noroads', peat_2019_aoi_time_uloc_ff_nourban_noroads.size()) //28117\
\
\
////////////////////////// EXCLUDE NON-TREE VARIETIES //////////////////////////////////////\
\
// function to get a list of all non-tree crops per year\
////////////////////////// WITHOUT NON-TREE VARIETIES //////////////////////////////////////\
\
// function to get a list of all non-tree crops per year\
var get_non_tree_var = function(feat_coll) \{\
    // define potential croplist\
    var pot_tree_ornam_list = ee.List([ 'ADDITIONAL', 'ALMOND', 'APPLE', 'APRICOT','BANANA', 'CITRUS', 'CHERRY', 'GUAVA', 'MANGO',\
                  'OLIVE', 'ORNAMENTAL', 'PAPAYA', 'PEAR', 'PISTACHIO', 'PLUM', 'POMEGRANATE'])\
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
    print('combined', combined)\
    // SORTING DOES NOT WORK IF VALUES HAS NON-UNIQUE ENTRIES (WHICH IS THE CASE)\
    //var sorted = combined.sort(values)\
    //print(sorted)\
    //var croplist_wo_trees = sorted\
    //  .map(function(v)\{ return ee.List(v).get(0) \})\
    \
    return keys\
    \
  \}   \
        \
\
// function to get a list of all non-tree crops per year\
////////////////////////// WITHOUT NON-TREE VARIETIES //////////////////////////////////////\
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
\
//////////////////////////////////////////////\
\
//  get croplist ofr all potential non-tree varieties \
var croplist = get_non_tree_var(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall) \
\
\
////////////////// FILTER BY IN - IN LIST - CROP LIST\
\
\
////////// filtered by allyears_croplist \
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall\
          .filter(ee.Filter.inList('dnn_variet', croplist))\
        \
          \
print('peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops.size()) \
// 37956\
\
// EXPORT \
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops, "peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops", "PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops")\
\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY ALL YEARS CROPLIST', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops.size(), //4774\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops.size(),   //33681\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops.size()) //28951\
\
///////////////// get counts for further filtersteps: //////////////////////\
////////////////////////// DNN SIMILARITY INDEX //////////////////////////////////////\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50= peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.5))\
          //.filter(ee.Filter.and(ee.Filter.gt('dnn_sim', 0.5),ee.Filter.lte('dnn_sim', 0.8)))\
        \
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops\
          .filter(ee.Filter.gte('dnn_sim', 0.8))\
\
\
print('DNN FILTERSTEPS', 'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50.size(), \
'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80.size())\
\
\
/// split up by year\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 50', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50.size(), //4774\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50.size(),   //33681\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50.size()) //28951\
\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 80', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80.size(), //4774\
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80.size(),   //33681\
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80.size()) //28951\
\
\
\
\
\
\
\
////////////////////////// GPS ACCURACY //////////////////////////////////////\
\
////////////////////////////////////////// for DNN 50 ////////////////////////////////\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 100),ee.Filter.eq('accuracy', 0.00).not()))\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 30),ee.Filter.eq('accuracy', 0.00).not()))\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not()))\
\
print('DNN 50 AND GPS ACC', 'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100.size(), \
'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30.size(), \
'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10.size()) \
\
\
/// split up by year\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 50, GPS 100 and YEAR', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100.size(), \
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100.size(),   \
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps100.size()) \
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 50, GPS 30 and YEAR', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30.size(), \
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30.size(),   \
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps30.size()) \
\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 50, GPS 10 and YEAR', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10.size(), \
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10.size(),   \
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt50_gps10.size()) \
\
\
\
\
////////////////////////////////////////// for DNN 80 ////////////////////////////////\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 100),ee.Filter.eq('accuracy', 0.00).not()))\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 30),ee.Filter.eq('accuracy', 0.00).not()))\
\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80\
          .filter(ee.Filter.and(ee.Filter.lte('accuracy', 10),ee.Filter.eq('accuracy', 0.00).not()))\
\
print('DNN 50 AND GPS ACC', 'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100.size(), \
'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30.size(), \
'peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10.size()) \
\
\
/// split up by year\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 80, GPS 100 and YEAR', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100.size(), \
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100.size(),   \
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps100.size()) \
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 80, GPS 30 and YEAR', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30.size(), \
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30.size(),   \
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps30.size()) \
\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10\
        .filter(ee.Filter.eq('year', 2017))\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10\
        .filter(ee.Filter.eq('year', 2018))\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10 = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10\
        .filter(ee.Filter.eq('year', 2019))\
\
print('FILTERED BY DNN 80, GPS 10 and YEAR', 'peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10', peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10.size(), \
'peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10', peat_2018_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10.size(),   \
'peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10', peat_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn_gt80_gps10.size()) \
\
\
}