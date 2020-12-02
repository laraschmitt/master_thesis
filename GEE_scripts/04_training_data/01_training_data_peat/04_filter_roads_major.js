{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // done in QGIS with spatial query plugin since EE is for raster processing not for vector\
// only import the shapes and print the count for completeness\
\
var peat_2017_aoi_time_uloc_ff_nourban_noroads = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_2017_aoi_time_uloc_ff_nourban_noroads')\
print(peat_2017_aoi_time_uloc_ff_nourban_noroads.size()) // 2769\
\
// plantix share 2017:\
var peat_2017_aoi_time_uloc_ff_nourban_noroads_plantix = peat_2017_aoi_time_uloc_ff_nourban_noroads\
                    .filter(ee.Filter.eq('app_name','Plantix'))\
print('peat_2017_aoi_time_uloc_ff_nourban_noroads_plantix', peat_2017_aoi_time_uloc_ff_nourban_noroads_plantix.size()) // \
\
\
\
var peat_2018_aoi_time_uloc_ff_nourban_noroads = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_2018_aoi_time_uloc_ff_nourban_noroads')\
print(peat_2018_aoi_time_uloc_ff_nourban_noroads.size()) // 28117\
\
// plantix share 2018:\
var peat_2018_aoi_time_uloc_ff_nourban_noroads_plantix = peat_2018_aoi_time_uloc_ff_nourban_noroads\
                    .filter(ee.Filter.eq('app_name','Plantix'))\
print('peat_2018_aoi_time_uloc_ff_nourban_noroads_plantix', peat_2018_aoi_time_uloc_ff_nourban_noroads_plantix.size()) // \
\
\
\
var peat_2019_aoi_time_uloc_ff_nourban_noroads = ee.FeatureCollection('users/laraschmitt1991/PEAT/peat_2019_aoi_time_uloc_ff_nourban_noroads')\
print(peat_2019_aoi_time_uloc_ff_nourban_noroads.size()) // 20645\
\
\
// plantix share 2019:\
var peat_2019_aoi_time_uloc_ff_nourban_noroads_plantix = peat_2019_aoi_time_uloc_ff_nourban_noroads\
                    .filter(ee.Filter.eq('app_name','Plantix'))\
print('peat_2019_aoi_time_uloc_ff_nourban_noroads_plantix', peat_2019_aoi_time_uloc_ff_nourban_noroads_plantix.size()) // \
\
}