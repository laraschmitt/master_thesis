{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM')\
\
\
/// load SpecTemps Composites\
var compos2017 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644")\
var compos2018 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2018_jan_march_32644")\
var compos2019 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644")\
\
\
// mask classified image for 1 \
var classified_image = ee.Image('users/laraschmitt1991/classified_maps/best_estimate_2017_2018_2019_7756')\
print(classified_image)\
\
\
var classified_2017 = classified_image.select('classfied_2017')\
var cropped_2017_masked = classified_2017.eq(1)\
\
var classified_2018 = classified_image.select('classfied_2018')\
var cropped_2018_masked = classified_2018.eq(1)\
\
var classified_2019 = classified_image.select('classfied_2019')\
var cropped_2019_masked = classified_2019.eq(1)\
\
Map.addLayer(cropped_masked)\
\
\
\
// spectemps update mask\
\
var spectemps_cropped_area_2017 = compos2017.updateMask(cropped_2017_masked)\
var spectemps_cropped_area_2018 = compos2018.updateMask(cropped_2018_masked)\
var spectemps_cropped_area_2019 = compos2019.updateMask(cropped_2019_masked)\
\
// export to assets\
\
\
Export.image.toAsset(\{\
  image: spectemps_cropped_area_2017.clip(aoi),\
  description: 'spectemps_cropped_area_2017',\
  assetId: 'composites/spectemps_cropped_area_2017_32644',\
  scale: 30,\
  crs: 'EPSG:32644',\
  region: aoi,\
  maxPixels: 697591435\
\});\
\
Export.image.toAsset(\{\
  image: spectemps_cropped_area_2018.clip(aoi),\
  description: 'spectemps_cropped_area_2018',\
  assetId: 'composites/spectemps_cropped_area_2018_32644',\
  scale: 30,\
  crs: 'EPSG:32644',\
  region: aoi,\
  maxPixels: 697591435\
\});\
\
Export.image.toAsset(\{\
  image: spectemps_cropped_area_2019.clip(aoi),\
  description: 'spectemps_cropped_area_2019',\
  assetId: 'composites/spectemps_cropped_area_2019_32644',\
  scale: 30,\
  crs: 'EPSG:32644',\
  region: aoi,\
  maxPixels: 697591435\
\});\
\
// visualization to check if it worked properly:\
var bands_med = spectemps_cropped_area_2017.select("blue_med", "green_med", "red_med")\
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
Map.addLayer(bands_med, vizParams, 'false color composite', false);\
\
}