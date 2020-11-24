{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM')\
\
// import classified maps zer zones \
var north_img = ee.Image('users/laraschmitt1991/classified_maps/north_zone_best_estimate_2018_2019_7756')\
var krishna_img = ee.Image('users/laraschmitt1991/classified_maps/krishna_zone_best_estimate_2018_2019_7756')\
var scarce_img = ee.Image('users/laraschmitt1991/classified_maps/scarce_zone_best_estimate_2018_2019_7756')\
var south_img = ee.Image('users/laraschmitt1991/classified_maps/southern_zone_best_estimate_2018_2019_7756')\
\
// change to current image\
var image = south_img\
\
var image_2017 = image.select(['classfied_2017'], ['bin_class'])\
Map.addLayer(image_2017, \{min: 1, max: 5, palette: ['orange', 'blue', 'red', 'green', 'grey']\}, 'classified map2019', false);\
var image_2018 = image.select(['classfied_2018'], ['bin_class'])\
var image_2019 = image.select(['classfied_2019'], ['bin_class'])\
\
\
// create image collection out of them\
var img_coll = ee.ImageCollection([image_2017, image_2018, image_2019])\
var pixel_sum = img_coll.reduce(ee.Reducer.sum())\
\
// mask == 3 (stable cropped areas)\
\
var mask_func = function(image, value) \{\
  return image.updateMask(image.eq(value));\
\};\
\
// stable cropped =  3 * 1 = 3\
//stable water = 3* 2 = 6 \
//stable = urban = 3*3 = 9 \
// stable forest = 3*4 = 12\
// stable non-cropped = 3* 5 = 15 \
\
// apply:\
var mask = mask_func(pixel_sum, 3)\
var mask = mask.toInt()\
print(mask)\
\
\
Map.addLayer(mask, \{min: 1, max: 2, palette: ['white', 'black']\}, 'sum');\
\
// calculate pixels \
\
var Dictionary = mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: aoi.geometry(),\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
// The result is a Dictionary.  Print it.\
print(Dictionary);}