{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // function to create new properties for the classes\
var set_crop_props = function(feature) \{\
  return feature.set(\{class_name: 'crop', class_id: 1, binary_id: 1\})\
  \};\
\
// IMPORT and ADD COLUMN  \
  \
// DNN 50\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100 = \
ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100')\
print(feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100.size())\
// \
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100 = \
feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100.map(set_crop_props)\
\
\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30 = \
ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30')\
print(feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30.size())\
// 4778\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30 = \
feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30.map(set_crop_props)\
\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10 = \
ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10')\
print(feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10.size())\
// 3571\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10 = \
feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10.map(set_crop_props)\
\
\
//DNN 80\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100 =\
    ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100')\
print( feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100.size())\
// 5115\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100 = \
feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100.map(set_crop_props)\
\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30 =\
    ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30')\
print( feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30.size())\
// 4420\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30 = \
feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30.map(set_crop_props)\
\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 =\
    ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10')\
print( feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.size())\
// 3329\
var feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = \
feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.map(set_crop_props)\
\
\
//// TOP CROPS ////////////\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10 =\
    ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10')\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10 = \
peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10.map(set_crop_props)\
print('test',peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10.limit(2))\
print( peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10.size())\
\
// FUSED LOCATION PROVIDER COMPARISION ////////////\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = \
  ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10')\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = \
peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.map(set_crop_props)\
print(peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.size())\
\
var peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = \
  ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10')\
    .filter(ee.Filter.eq('app_name', 'Plantix'))\
var peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10 = \
peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.map(set_crop_props)\
print('yes', peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10.size())\
\
/////////////////// SELECT 3200 POINTS PER FEATURE COLLECTION (for 9 td sets) //////////////////\
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100\
        = feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(3200)\
//export \
Export.table.toAsset(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc100, \
 "td_peat_dnn50_acc100_3200", \
 "training_data/single_PEAT/td_peat_dnn50_acc100_3200")\
 \
 \
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30\
        = feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(3200)\
//export \
Export.table.toAsset(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc30, \
 "td_peat_dnn50_acc30_3200", \
 "training_data/single_PEAT/td_peat_dnn50_acc30_3200") \
 \
 \
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10\
        = feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(3200)\
//export \
Export.table.toAsset(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn50_acc10, \
  "td_peat_dnn50_acc10_3200", \
 "training_data/single_PEAT/td_peat_dnn50_acc10_3200") \
 \
\
// DNN 80\
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100\
        = feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(3200)\
//export \
Export.table.toAsset(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc100, \
  "td_peat_dnn80_acc100_3200", \
 "training_data/single_PEAT/td_peat_dnn80_acc100_3200") \
 \
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30\
        = feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(3200)\
//export \
Export.table.toAsset(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc30, \
  "td_peat_dnn80_acc30_3200", \
 "training_data/single_PEAT/td_peat_dnn80_acc30_3200") \
 \
var td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10\
        = feat_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(3200)\
//export \
Export.table.toAsset(td_peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10, \
  "td_peat_dnn80_acc10_3200", \
 "training_data/single_PEAT/td_peat_dnn80_acc10_3200") \
\
\
/////////////////// SELECT 2800 for TOPCROPS dataset //////////////////\
var peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10\
        = peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(2800)\
//export \
Export.table.toAsset(peat_allyears_aoi_time_uloc_ff_nourban_noroads_nogall_TOPCROPS_dnn80_acc10, \
 "td_peat_TOPCROPS_dnn80_acc10_2800", \
 "training_data/single_PEAT/td_peat_TOPCROPS_dnn80_acc10_2800")\
\
\
/////////////////// SELECT 1400 for fused loc provider comparison //////////////////\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10\
        = peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(1200)\
//export \
Export.table.toAsset(peat_2017_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10, \
 "td_peat_2017_dnn80_acc10_1200", \
 "training_data/single_PEAT/td_peat_2017_dnn80_acc10_1200")\
 \
 \
var peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10\
        = peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10\
                    .randomColumn('X')\
                    .sort('X')\
                    .limit(1200)\
//export \
Export.table.toAsset(peat_2018_2019_aoi_time_uloc_ff_nourban_noroads_nogall_crops_dnn80_acc10, \
 "td_peat_201819_dnn80_acc10_1200", \
 "training_data/single_PEAT/td_peat_201819_dnn80_acc10_1200")\
 \
 \
\
}