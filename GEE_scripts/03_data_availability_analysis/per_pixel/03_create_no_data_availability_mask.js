{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
var cso_2017 = ee.Image('users/laraschmitt1991/CSO/clear_sky_obs_2017')\
var cso_2018 = ee.Image('users/laraschmitt1991/CSO/clear_sky_obs_2018')\
var cso_2019 = ee.Image('users/laraschmitt1991/CSO/clear_sky_obs_2019')\
\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM")\
\
var viz = \{min: 0, max: 22, palette: [ 'ff0000', 'ffff00','0000FF', '00ff00', '800080']\};\
\
Map.addLayer(cso_2017, viz, '2017', false);\
Map.addLayer(cso_2018, viz, '2018', false);\
Map.addLayer(cso_2019, viz, '2019', false);\
\
Map.centerObject(cso_2019)\
\
\
// mask all of 0 values of all of the three images \
\
\
var nodata_mask_cso_2017 = cso_2017.eq(0);\
var nodata_mask_cso_2018 = cso_2017.eq(0);\
var nodata_mask_cso_2019 = cso_2017.eq(0);\
Map.addLayer(nodata_mask_cso_2019)\
\
// stack the maks together (from different images)\
var stacked_nodata_mask= nodata_mask_cso_2017\
                     .addBands(nodata_mask_cso_2018)\
                     .addBands(nodata_mask_cso_2019)\
                   \
print(stacked_nodata_mask)\
\
// reduce to one band\
var img_no_data_2017_18_19 = stacked_nodata_mask.reduce(ee.Reducer.sum())\
print(img_no_data_2017_18_19)\
\
//////////////// stats\
\
// try next solution: mask image for certain band value and then do the count\
\
var mask_func = function(image, value) \{\
  return image.updateMask(image.gt(value));\
\};\
\
// apply:\
var mask = mask_func(img_no_data_2017_18_19, 0)\
\
var Dictionary = mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: aoi.geometry(),\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
// The result is a Dictionary.  Print it.\
print(Dictionary);\
\
// eq 0: 184313144\
// gt 0: 3514  -> pixels that were cloudy in one of the years for all satellite images\
// lt 0: 0\
////////////////////////////////\
\
// use not() logical operator to invert the mask \
var mask_not = img_no_data_2017_18_19.not()\
Map.addLayer(mask_not)\
\
// export the inverted mask ( rest of the code below needs to then be applied on all three\
//composites )\
\
Export.image.toAsset(\{\
  image: mask_not, \
  description: 'nodata_mask_export', \
  assetId: 'no_data_mask',   \
  region: aoi.geometry(),\
  scale: 30,\
  maxPixels: 800000000\
   \});\
\
\
\
\
///////////////////////////////////////////////////////////\
\
//update on composite: \
var compos2019 = ee.Image("users/laraschmitt1991/SpecTemps_Composite_2019_jan_march_4326")\
var compos2019_nodata_masked = compos2019.updateMask(mask_not)\
\
var bands_med = compos2019_nodata_masked.select("blue_med", "green_med", "red_med")\
\
// Define the visualization parameters.\
var vizParams = \{\
  bands: ['red_med', 'green_med', 'blue_med'],\
  min: 0,\
  max: 4000,\
  gamma: [0.95, 1.1, 1]\
\};\
\
// Center the map and display the image.\
Map.addLayer(bands_med, vizParams, 'false color composite');\
\
}