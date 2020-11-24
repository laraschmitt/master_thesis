{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
// load peat data aoi_time_uloc_ff\
var peat_2019_aoi_time_uloc_ff = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2019_aoi_time_uloc_ff_nogall")\
print ('peat_2019_aoi_time_uloc_ff',peat_2019_aoi_time_uloc_ff.size())  // 28547\
\
var peat_2018_aoi_time_uloc_ff = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2018_aoi_time_uloc_ff_nogall")\
print ('peat_2018_aoi_time_uloc_ff', peat_2018_aoi_time_uloc_ff.size())  // 44388\
\
var peat_2017_aoi_time_uloc_ff = ee.FeatureCollection("users/laraschmitt1991/PEAT/peat_2017_aoi_time_uloc_ff_nogall")\
print ('peat_2017_aoi_time_uloc_ff', peat_2017_aoi_time_uloc_ff.size())  // 4048\
\
//////////////////////////////////\
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
//////////////////////FILTER OUT URBAN AREAS ////////////////////////////////////\
\
var GUF_AP_dilated_img = ee.Image("users/laraschmitt1991/GUF/GUF_AP_dilated_img")\
//print(GUF_AP_dilated_img) // band = 'distance', urban = 1, non-urban = masked\
//Map.addLayer(GUF_AP_dilated_img)\
\
\
////////////////////// 2019 ////////////////////////////\
\
\
// apply to feature collection\
// a mapped algorithm must return a Feature or Image -> solution: set a property\
var peat_2019_aoi_time_uloc_ff_urban_info = peat_2019_aoi_time_uloc_ff.map(function(feature)\{\
  var extracted = extract(feature, GUF_AP_dilated_img);\
  return feature.set(extracted) \
\});\
\
//print(peat_2019_aoi_time_uloc_ff_urban_info.limit(100))\
// if point lies in urban area, then property distance = 1, if not, then property does not exist \
\
// filter for points outside of urban areas:\
var peat_2019_aoi_time_uloc_ff_urban = peat_2019_aoi_time_uloc_ff_urban_info\
                    .filter(ee.Filter.eq('distance',1))\
print('peat_2019_aoi_time_uloc_ff_urban', peat_2019_aoi_time_uloc_ff_urban.size()) //  \
// == % of the points in urban areas \
\
var filter_urban = (ee.Filter.eq('distance',1))                 \
var filterNot = filter_urban.not();\
var peat_2019_aoi_time_uloc_ff_nourban = peat_2019_aoi_time_uloc_ff_urban_info.filter(filterNot)                    \
print('peat_2019_aoi_time_uloc_ff_nourban', peat_2019_aoi_time_uloc_ff_nourban.size()) // \
\
// plantix share 2019:\
var peat_2019_aoi_time_uloc_ff_nourban_plantix = peat_2019_aoi_time_uloc_ff_nourban\
                    .filter(ee.Filter.eq('app_name','Plantix'))\
print('peat_2019_aoi_time_uloc_ff_nourban_plantix', peat_2019_aoi_time_uloc_ff_nourban_plantix.size()) // \
\
// export 2 min \
Export.table.toDrive(peat_2019_aoi_time_uloc_ff_nourban, "peat_2019_aoi_time_uloc_ff_nourban")\
\
///////////////////// 2018 ////////////////////////////\
\
// apply to feature collection\
// a mapped algorithm must return a Feature or Image -> solution: set a property\
var peat_2018_aoi_time_uloc_ff_urban_info = peat_2018_aoi_time_uloc_ff.map(function(feature)\{\
  var extracted = extract(feature, GUF_AP_dilated_img);\
  return feature.set(extracted) \
\});\
\
//print(peat_2018_aoi_time_uloc_ff_urban_info.limit(100))\
// if point lies in urban area, then property distance = 1, if not, then property does not exist \
\
// filter for points outside of urban areas:\
var peat_2018_aoi_time_uloc_ff_urban = peat_2018_aoi_time_uloc_ff_urban_info\
                    .filter(ee.Filter.eq('distance',1))\
print('peat_2018_aoi_time_uloc_ff_urban', peat_2018_aoi_time_uloc_ff_urban.size()) //  \
// == % of the points in urban areas \
\
var filter_urban = (ee.Filter.eq('distance',1))                 \
var filterNot = filter_urban.not();\
var peat_2018_aoi_time_uloc_ff_nourban = peat_2018_aoi_time_uloc_ff_urban_info.filter(filterNot)                    \
print('peat_2018_aoi_time_uloc_ff_nourban', peat_2018_aoi_time_uloc_ff_nourban.size()) // \
\
// plantix share 2018:\
var peat_2018_aoi_time_uloc_ff_nourban_plantix = peat_2018_aoi_time_uloc_ff_nourban\
                    .filter(ee.Filter.eq('app_name','Plantix'))\
print('peat_2018_aoi_time_uloc_ff_nourban_plantix', peat_2018_aoi_time_uloc_ff_nourban_plantix.size()) // \
\
\
\
// export 2 min \
Export.table.toDrive(peat_2018_aoi_time_uloc_ff_nourban, "peat_2018_aoi_time_uloc_ff_nourban")\
\
\
\
///////////////////// 2017 ////////////////////////////\
\
// apply to feature collection\
// a mapped algorithm must return a Feature or Image -> solution: set a property\
var peat_2017_aoi_time_uloc_ff_urban_info = peat_2017_aoi_time_uloc_ff.map(function(feature)\{\
  var extracted = extract(feature, GUF_AP_dilated_img);\
  return feature.set(extracted) \
\});\
\
//print(peat_2017_aoi_time_uloc_ff_urban_info.limit(100))\
// if point lies in urban area, then property distance = 1, if not, then property does not exist \
\
// filter for points outside of urban areas:\
var peat_2017_aoi_time_uloc_ff_urban = peat_2017_aoi_time_uloc_ff_urban_info\
                    .filter(ee.Filter.eq('distance',1))\
print('peat_2017_aoi_time_uloc_ff_urban', peat_2017_aoi_time_uloc_ff_urban.size()) //  \
// ==  of the points in urban areas \
\
var filter_urban = (ee.Filter.eq('distance',1))                 \
var filterNot = filter_urban.not();\
var peat_2017_aoi_time_uloc_ff_nourban = peat_2017_aoi_time_uloc_ff_urban_info.filter(filterNot)                    \
print('peat_2017_aoi_time_uloc_ff_nourban', peat_2017_aoi_time_uloc_ff_nourban.size()) // \
\
\
// plantix share 2017:\
var peat_2017_aoi_time_uloc_ff_nourban_plantix = peat_2017_aoi_time_uloc_ff_nourban\
                    .filter(ee.Filter.eq('app_name','Plantix'))\
print('peat_2017_aoi_time_uloc_ff_nourban_plantix', peat_2017_aoi_time_uloc_ff_nourban_plantix.size()) // \
\
\
\
\
\
// export 2 min \
Export.table.toDrive(peat_2017_aoi_time_uloc_ff_nourban, "peat_2017_aoi_time_uloc_ff_nourban")}