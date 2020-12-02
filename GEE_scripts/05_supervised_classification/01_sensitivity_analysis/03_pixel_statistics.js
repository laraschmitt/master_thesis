{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 //////////////// PIXEL COUNT STATS ////////////////////////////\
\
// mask image for certain band value (cropped = 1, water = 2, urban = 3, forest = 4; unswon = 5) \
//and then ee.Reducer.count for the pixel count\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
\
// change current_class and current_image !!!!!!!\
var current_image = ee.Image('users/laraschmitt1991/classified_maps/DNN80_ACC30_2017_2018_2019_7756')\
\
\
// FUNCTION:\
var mask_func = function(image, value) \{\
  return image.updateMask(image.eq(value));\
\};\
\
//apply\
var cropped_mask = mask_func(current_image, 1)\
var water_mask = mask_func(current_image, 2)\
var urban_mask = mask_func(current_image, 3)\
var forest_mask = mask_func(current_image, 4)\
var bare_mask = mask_func(current_image, 5)\
\
var Dic_pixelcount_cropped = cropped_mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: aoi,\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
var Dic_pixelcount_water = water_mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: aoi,\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
var Dic_pixelcount_urban = urban_mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: aoi,\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
var Dic_pixelcount_forest = forest_mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: aoi,\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
var Dic_pixelcount_bare = bare_mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: aoi,\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
print('Pixel counts', \
      'cropped', Dic_pixelcount_cropped,\
      'water', Dic_pixelcount_water,\
      'urban', Dic_pixelcount_urban,\
      'forest', Dic_pixelcount_forest,\
      'bare', Dic_pixelcount_bare\
      \
      );\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
}