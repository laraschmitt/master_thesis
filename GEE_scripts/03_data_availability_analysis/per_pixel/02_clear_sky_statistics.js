{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
var image = ee.Image('users/laraschmitt1991/clear_sky_obs_2017')\
print(image)\
var ndwiViz = \{min: 1, max: 16, palette: ['00FFFF', '0000FF']\};\
Map.addLayer(image, ndwiViz, 'NDWI', false);\
Map.centerObject(image)\
\
var region = ee.FeatureCollection('users/laraschmitt1991/andhra_pradesh_borders_shape')\
\
// Reduce the region. The region parameter is the Feature geometry.\
var meanDictionary = image.reduceRegion(\{\
  reducer: ee.Reducer.mean(),\
  geometry: region.geometry(),\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
print(meanDictionary);\
\
//  mask image for certain band value and then do the count\
var mask_func = function(image, value) \{\
  return image.updateMask(image.gt(value));\
\};\
\
// apply:\
var mask = mask_func(image, 4)\
\
var Dictionary = mask.reduceRegion(\{\
  reducer: ee.Reducer.count(),\
  geometry: region.geometry(),\
  scale: 30,\
  maxPixels: 1e9\
\});\
\
// result is a Dictionary\
print(Dictionary);\
\
}