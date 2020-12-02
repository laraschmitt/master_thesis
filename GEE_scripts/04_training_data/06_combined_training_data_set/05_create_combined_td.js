{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // import \
\
\
var td_noncropped_3200_2017 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_3200_2017')\
var td_noncropped_3200_2018 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_3200_2018')\
var td_noncropped_3200_2019 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_3200_2019')\
\
var td_noncropped_2800_2017 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_2800_2017')\
var td_noncropped_2800_2018 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_2800_2018')\
var td_noncropped_2800_2019 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_2800_2019')\
\
\
var td_noncropped_1400_2017 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_1200_2017')\
var td_noncropped_1400_2018 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_1200_2018')\
var td_noncropped_1400_2019 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_noncropped/td_noncropped_1200_2019')\
print(td_noncropped_1400_2019.size())\
\
\
var td_peat_dnn50_acc100_3200 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_dnn50_acc100_3200')\
var td_peat_dnn50_acc30_3200 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_dnn50_acc30_3200')\
var td_peat_dnn50_acc10_3200 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_dnn50_acc10_3200')\
\
var td_peat_dnn80_acc100_3200 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_dnn80_acc100_3200')\
var td_peat_dnn80_acc30_3200 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_dnn80_acc30_3200')\
var td_peat_dnn80_acc10_3200 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_dnn80_acc10_3200')\
\
var td_peat_TOPCROPS_dnn80_acc10_2800 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_TOPCROPS_dnn80_acc10_2800')\
\
var td_peat_2017_dnn80_acc10_1400 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_2017_dnn80_acc10_1200')\
var td_peat_201819_dnn80_acc10_1400 = ee.FeatureCollection('users/laraschmitt1991/training_data/single_PEAT/td_peat_201819_dnn80_acc10_1200')\
print(td_peat_2017_dnn80_acc10_1400.size())\
\
\
\
\
//////////////// MWEGE AND EXPORT FOR DIFFERENT YEARS   ///////////////////\
\
\
//////////////////////////////// 2017 ///////////////////////////////////////\
\
// merge\
var td_peat_dnn50_acc100_3200_td_noncropped_3200_2017 = td_noncropped_3200_2017.merge(td_peat_dnn50_acc100_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc100_3200_td_noncropped_3200_2017, \
  'td_peat_dnn50_acc100_3200_td_noncropped_3200_2017', \
  'training_data/combined_2017/td_peat_dnn50_acc100_3200_td_noncropped_3200_2017')\
  \
var td_peat_dnn50_acc30_3200_td_noncropped_3200_2017 = td_noncropped_3200_2017.merge(td_peat_dnn50_acc30_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc30_3200_td_noncropped_3200_2017, \
  'td_peat_dnn50_acc30_3200_td_noncropped_3200_2017', \
  'training_data/combined_2017/td_peat_dnn50_acc30_3200_td_noncropped_3200_2017')\
  \
var td_peat_dnn50_acc10_3200_td_noncropped_3200_2017 = td_noncropped_3200_2017.merge(td_peat_dnn50_acc10_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc10_3200_td_noncropped_3200_2017, \
  'td_peat_dnn50_acc10_3200_td_noncropped_3200_2017', \
  'training_data/combined_2017/td_peat_dnn50_acc10_3200_td_noncropped_3200_2017')\
\
var td_peat_dnn80_acc100_3200_td_noncropped_3200_2017 = td_noncropped_3200_2017.merge(td_peat_dnn80_acc100_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc100_3200_td_noncropped_3200_2017, \
  'td_peat_dnn80_acc100_3200_td_noncropped_3200_2017', \
  'training_data/combined_2017/td_peat_dnn80_acc100_3200_td_noncropped_3200_2017')\
  \
var td_peat_dnn80_acc30_3200_td_noncropped_3200_2017 = td_noncropped_3200_2017.merge(td_peat_dnn80_acc30_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc30_3200_td_noncropped_3200_2017, \
  'td_peat_dnn80_acc30_3200_td_noncropped_3200_2017', \
  'training_data/combined_2017/td_peat_dnn80_acc30_3200_td_noncropped_3200_2017')\
  \
var td_peat_dnn80_acc10_3200_td_noncropped_3200_2017 = td_noncropped_3200_2017.merge(td_peat_dnn80_acc10_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc10_3200_td_noncropped_3200_2017, \
  'td_peat_dnn80_acc10_3200_td_noncropped_3200_2017', \
  'training_data/combined_2017/td_peat_dnn80_acc10_3200_td_noncropped_3200_2017')\
\
\
var td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2017 = td_noncropped_2800_2017.merge(td_peat_TOPCROPS_dnn80_acc10_2800)\
// export\
Export.table.toAsset(\
  td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2017, \
  'td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2017', \
  'training_data/combined_2017/td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2017')\
\
\
var td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2017 = td_noncropped_1400_2017.merge(td_peat_2017_dnn80_acc10_1400)\
// export\
Export.table.toAsset(\
  td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2017, \
  'td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2017', \
  'training_data/combined_2017/td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2017')\
\
var td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2017 = td_noncropped_1400_2017.merge(td_peat_201819_dnn80_acc10_1400)\
// export\
Export.table.toAsset(\
  td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2017, \
  'td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2017', \
  'training_data/combined_2017/td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2017')\
  \
\
// test sizes\
print(\
  td_peat_dnn50_acc100_3200_td_noncropped_3200_2017.size(),\
  td_peat_dnn50_acc30_3200_td_noncropped_3200_2017.size(),\
  td_peat_dnn50_acc10_3200_td_noncropped_3200_2017.size(),\
  td_peat_dnn80_acc100_3200_td_noncropped_3200_2017.size(),\
  td_peat_dnn80_acc30_3200_td_noncropped_3200_2017.size(),\
  td_peat_dnn80_acc10_3200_td_noncropped_3200_2017.size(),\
  td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2017.size(),\
  td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2017.size(),\
  td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2017.size())\
  \
  \
  \
 //////////////////////////////// 2018 ///////////////////////////////////////\
\
// merge\
var td_peat_dnn50_acc100_3200_td_noncropped_3200_2018 = td_noncropped_3200_2018.merge(td_peat_dnn50_acc100_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc100_3200_td_noncropped_3200_2018, \
  'td_peat_dnn50_acc100_3200_td_noncropped_3200_2018', \
  'training_data/combined_2018/td_peat_dnn50_acc100_3200_td_noncropped_3200_2018')\
  \
var td_peat_dnn50_acc30_3200_td_noncropped_3200_2018 = td_noncropped_3200_2018.merge(td_peat_dnn50_acc30_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc30_3200_td_noncropped_3200_2018, \
  'td_peat_dnn50_acc30_3200_td_noncropped_3200_2018', \
  'training_data/combined_2018/td_peat_dnn50_acc30_3200_td_noncropped_3200_2018')\
  \
var td_peat_dnn50_acc10_3200_td_noncropped_3200_2018 = td_noncropped_3200_2018.merge(td_peat_dnn50_acc10_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc10_3200_td_noncropped_3200_2018, \
  'td_peat_dnn50_acc10_3200_td_noncropped_3200_2018', \
  'training_data/combined_2018/td_peat_dnn50_acc10_3200_td_noncropped_3200_2018')\
\
var td_peat_dnn80_acc100_3200_td_noncropped_3200_2018 = td_noncropped_3200_2018.merge(td_peat_dnn80_acc100_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc100_3200_td_noncropped_3200_2018, \
  'td_peat_dnn80_acc100_3200_td_noncropped_3200_2018', \
  'training_data/combined_2018/td_peat_dnn80_acc100_3200_td_noncropped_3200_2018')\
  \
var td_peat_dnn80_acc30_3200_td_noncropped_3200_2018 = td_noncropped_3200_2018.merge(td_peat_dnn80_acc30_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc30_3200_td_noncropped_3200_2018, \
  'td_peat_dnn80_acc30_3200_td_noncropped_3200_2018', \
  'training_data/combined_2018/td_peat_dnn80_acc30_3200_td_noncropped_3200_2018')\
  \
var td_peat_dnn80_acc10_3200_td_noncropped_3200_2018 = td_noncropped_3200_2018.merge(td_peat_dnn80_acc10_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc10_3200_td_noncropped_3200_2018, \
  'td_peat_dnn80_acc10_3200_td_noncropped_3200_2018', \
  'training_data/combined_2018/td_peat_dnn80_acc10_3200_td_noncropped_3200_2018')\
\
\
var td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2018 = td_noncropped_2800_2018.merge(td_peat_TOPCROPS_dnn80_acc10_2800)\
// export\
Export.table.toAsset(\
  td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2018, \
  'td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2018', \
  'training_data/combined_2018/td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2018')\
\
\
var td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2018 = td_noncropped_1400_2018.merge(td_peat_2017_dnn80_acc10_1400)\
// export\
Export.table.toAsset(\
  td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2018, \
  'td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2018', \
  'training_data/combined_2018/td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2018')\
\
var td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2018 = td_noncropped_1400_2018.merge(td_peat_201819_dnn80_acc10_1400)\
// export\
Export.table.toAsset(\
  td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2018, \
  'td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2018', \
  'training_data/combined_2018/td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2018')\
  \
\
// test sizes\
print(\
  td_peat_dnn50_acc100_3200_td_noncropped_3200_2018.size(),\
  td_peat_dnn50_acc30_3200_td_noncropped_3200_2018.size(),\
  td_peat_dnn50_acc10_3200_td_noncropped_3200_2018.size(),\
  td_peat_dnn80_acc100_3200_td_noncropped_3200_2018.size(),\
  td_peat_dnn80_acc30_3200_td_noncropped_3200_2018.size(),\
  td_peat_dnn80_acc10_3200_td_noncropped_3200_2018.size(),\
  td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2018.size(),\
  td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2018.size(),\
  td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2018.size())\
  \
  \
 //////////////////////////////// 2019 ///////////////////////////////////////\
\
// merge\
var td_peat_dnn50_acc100_3200_td_noncropped_3200_2019 = td_noncropped_3200_2019.merge(td_peat_dnn50_acc100_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc100_3200_td_noncropped_3200_2019, \
  'td_peat_dnn50_acc100_3200_td_noncropped_3200_2019', \
  'training_data/combined_2019/td_peat_dnn50_acc100_3200_td_noncropped_3200_2019')\
  \
var td_peat_dnn50_acc30_3200_td_noncropped_3200_2019 = td_noncropped_3200_2019.merge(td_peat_dnn50_acc30_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc30_3200_td_noncropped_3200_2019, \
  'td_peat_dnn50_acc30_3200_td_noncropped_3200_2019', \
  'training_data/combined_2019/td_peat_dnn50_acc30_3200_td_noncropped_3200_2019')\
  \
var td_peat_dnn50_acc10_3200_td_noncropped_3200_2019 = td_noncropped_3200_2019.merge(td_peat_dnn50_acc10_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn50_acc10_3200_td_noncropped_3200_2019, \
  'td_peat_dnn50_acc10_3200_td_noncropped_3200_2019', \
  'training_data/combined_2019/td_peat_dnn50_acc10_3200_td_noncropped_3200_2019')\
\
var td_peat_dnn80_acc100_3200_td_noncropped_3200_2019 = td_noncropped_3200_2019.merge(td_peat_dnn80_acc100_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc100_3200_td_noncropped_3200_2019, \
  'td_peat_dnn80_acc100_3200_td_noncropped_3200_2019', \
  'training_data/combined_2019/td_peat_dnn80_acc100_3200_td_noncropped_3200_2019')\
  \
var td_peat_dnn80_acc30_3200_td_noncropped_3200_2019 = td_noncropped_3200_2019.merge(td_peat_dnn80_acc30_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc30_3200_td_noncropped_3200_2019, \
  'td_peat_dnn80_acc30_3200_td_noncropped_3200_2019', \
  'training_data/combined_2019/td_peat_dnn80_acc30_3200_td_noncropped_3200_2019')\
  \
var td_peat_dnn80_acc10_3200_td_noncropped_3200_2019 = td_noncropped_3200_2019.merge(td_peat_dnn80_acc10_3200)\
// export\
Export.table.toAsset(\
  td_peat_dnn80_acc10_3200_td_noncropped_3200_2019, \
  'td_peat_dnn80_acc10_3200_td_noncropped_3200_2019', \
  'training_data/combined_2019/td_peat_dnn80_acc10_3200_td_noncropped_3200_2019')\
\
\
var td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2019 = td_noncropped_2800_2019.merge(td_peat_TOPCROPS_dnn80_acc10_2800)\
// export\
Export.table.toAsset(\
  td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2019, \
  'td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2019', \
  'training_data/combined_2019/td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2019')\
\
\
var td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2019 = td_noncropped_1400_2019.merge(td_peat_2017_dnn80_acc10_1400)\
// export\
Export.table.toAsset(\
  td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2019, \
  'td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2019', \
  'training_data/combined_2019/td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2019')\
\
var td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2019 = td_noncropped_1400_2019.merge(td_peat_201819_dnn80_acc10_1400)\
// export\
Export.table.toAsset(\
  td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2019, \
  'td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2019', \
  'training_data/combined_2019/td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2019')\
  \
\
// test sizes\
print(\
  td_peat_dnn50_acc100_3200_td_noncropped_3200_2019.size(),\
  td_peat_dnn50_acc30_3200_td_noncropped_3200_2019.size(),\
  td_peat_dnn50_acc10_3200_td_noncropped_3200_2019.size(),\
  td_peat_dnn80_acc100_3200_td_noncropped_3200_2019.size(),\
  td_peat_dnn80_acc30_3200_td_noncropped_3200_2019.size(),\
  td_peat_dnn80_acc10_3200_td_noncropped_3200_2019.size(),\
  td_peat_TOPCROPS_dnn80_acc10_2800_td_noncropped_2800_2019.size(),\
  td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2019.size(),\
  td_peat_201819_dnn80_acc10_1400_td_noncropped_1400_2019.size())\
  \
  }