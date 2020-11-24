{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /////////////////////////////////FILTER 1: aoi ///////////////////\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
Map.addLayer(aoi)\
\
\
// import csvs\
// already applied filters on datasets:\
// 1) removed multiple submission \
var peat_2019_aoi_time_uloc_ff_nogall = ee.FeatureCollection("users/laraschmitt1991/PEAT/2019_clean_complete_EE_ready").filterBounds(aoi)\
print('peat_2019_aoi_time_uloc_ff_nogall size', peat_2019_aoi_time_uloc_ff_nogall.size()) //28547\
print('peat_2019_aoi_time_uloc_ff_nogall size', peat_2019_aoi_time_uloc_ff_nogall.limit(3))\
Map.addLayer(peat_2019_aoi_time_uloc_ff_nogall)\
var peat_2018_aoi_time_uloc_ff_nogall = ee.FeatureCollection("users/laraschmitt1991/PEAT/2018_clean_complete_EE_ready").filterBounds(aoi)\
print('peat_2018_aoi_time_uloc_ff_nogall size', peat_2018_aoi_time_uloc_ff_nogall.size()) // 44388\
Map.addLayer(peat_2018_aoi_time_uloc_ff_nogall)\
var peat_2017_aoi_time_uloc_ff_nogall = ee.FeatureCollection("users/laraschmitt1991/PEAT/2017_clean_complete_EE_ready").filterBounds(aoi)\
print('peat_2017_aoi_time_uloc_ff_nogall size', peat_2017_aoi_time_uloc_ff_nogall.size()) //  4048\
\
\
/////////////// export, runtime 5min\
Export.table.toAsset(peat_2019_aoi_time_uloc_ff_nogall, "peat_2019_aoi_time_uloc_ff_nogall", "PEAT/peat_2019_aoi_time_uloc_ff_nogall") \
Export.table.toAsset(peat_2018_aoi_time_uloc_ff_nogall, "peat_2018_aoi_time_uloc_ff_nogall", "PEAT/peat_2018_aoi_time_uloc_ff_nogall") \
Export.table.toAsset(peat_2017_aoi_time_uloc_ff_nogall, "peat_2017_aoi_time_uloc_ff_nogall", "PEAT/peat_2017_aoi_time_uloc_ff_nogall") \
\
\
\
/*\
////////////////OLD FILTERs 2: TIMEFRAME /////////////////////////////\
\
//funtion to set timestamp string as system:time_start to be able to filter for date\
var set_ee_data_prop = function(feature)\{\
  var d = ee.String(feature.get('timestamp')).slice(0, 10);\
  return feature.set(\{'system:time_start': ee.Date(d)\})\
\}\
var peat_2019_aoi = peat_2019_aoi.map(set_ee_data_prop)\
var peat_2018_aoi = peat_2018_aoi.map(set_ee_data_prop)\
var peat_2017_aoi = peat_2017_aoi.map(set_ee_data_prop)\
\
// Filter : Date range (January - March?) // includes start and enddate \
var start2019 = ee.Date('2019-01-01');\
var finish2019 = ee.Date('2019-03-31');\
\
// apply filters on clipped & dated dataset: \
var peat_2019_aoi_time = peat_2019_aoi\
          .filterDate(start2019, finish2019)\
          \
print('peat_2019_aoi_time', peat_2019_aoi_time.size()) // 99009  \
Map.addLayer(peat_2019_aoi_time, \{color: 'FF0000'\}, 'peat_2019_aoi_time');\
\
\
//////////// FILTER: FEEDFORWARD = 2 ////////////////////////////\
\
// filter for recognized as plant:   15766 from joeys!! before b\
// filter for feedforward = 4 and 5  (object net, recognized as plant)\
// 2 = human, 1 = ? , 3 = ? \
\
// ff values\
var ff = ee.List([4, 5])\
var peat_2019_aoi_time_ff = peat_2019_aoi_time.filter(ee.Filter.inList('feedforward_integer', ff))\
print('peat_2019_aoi_time_ff', peat_2019_aoi_time_ff.size()) // 66639\
Map.addLayer(peat_2019_aoi_time_ff)\
\
///////////////////////////////////////////////////////////////\
\
// remove system:time_start property to be able to export collection \
// Generic Function to remove a property from a feature\
var removeProperty = function(feat, property) \{\
  var properties = feat.propertyNames()\
  var selectProperties = properties.filter(ee.Filter.neq('item', property))\
  return feat.select(selectProperties)\
\}\
\
// remove property system:time_start in each feature\
var peat_2019_aoi_time_ff = peat_2019_aoi_time_ff.map(function(feat) \{\
  return removeProperty(feat, 'system:time_start')\})\
\
var peat_2018_aoi_time_ff = peat_2018_aoi_time_ff.map(function(feat) \{\
  return removeProperty(feat, 'system:time_start')\})\
\
var peat_2017_aoi_time_ff = peat_2017_aoi_time_ff.map(function(feat) \{\
  return removeProperty(feat, 'system:time_start')\})\
\
*/\
}