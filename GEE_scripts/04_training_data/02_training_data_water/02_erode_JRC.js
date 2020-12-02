{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var water_image = ee.Image("JRC/GSW1_1/GlobalSurfaceWater");\
//aoi negative for vis\
var aoi_negative = ee.FeatureCollection("users/laraschmitt1991/aoi_negative")\
//Map.addLayer(aoi_negative.draw(\{color: 'EDEDED', strokeWidth: 0\}), \{\}, 'drawn');\
\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
var water_clipped = water_image.clip(aoi)\
var occurrence = water_clipped.select('occurrence')\
\
/////////////////// MASK OUT NON-VALID TRAINING AREAS OF WATER IMAGE ///////////////////////////////////////////\
\
\
// create occurene mask (= frequency with which water was present in the respective years)\
var water_occurence = water_clipped.select('occurrence');\
var mask_occ = water_occurence.gt(98);\
var vis3 = \{min: 1, max: 0, palette: [ 'FFFF00','008000']\};\
Map.addLayer(mask_occ, vis3, 'mask_occ')\
\
\
\
// create reoccurene mask (= water returns from year to year)\
var water_reccurence = water_clipped.select('recurrence');\
var mask_recc = water_reccurence.gt(99);\
var vis3 = \{min: 1, max: 0, palette: [ '008080','008000']\};\
Map.addLayer(mask_recc, vis3, 'mask_recc')\
\
//export mask \
Export.image.toDrive(\{\
  image: mask_recc, \
  description: 'water_reccurence_mask',\
  region: aoi,\
  scale: 30, \
  maxPixels: 1000000000000\
  \})\
\
// Create seasonality mask ( = 12 months to exclude paddy rice fields and areas that dry up in Rabi)\
var water_seasonality = water_clipped.select('seasonality');\
var mask_seas = water_seasonality.eq(12);\
var vis = \{min: 1, max: 0, palette: [ '2b428d' ,'EADEBD']\};\
Map.addLayer(mask_seas, vis, 'mask_seas')\
\
// combine the masks \
var water_seas100_occ98_recc99 = mask_occ\
              .updateMask(mask_seas)\
              .updateMask(mask_recc)\
\
\
//export mask \
Export.image.toDrive(\{\
  image: water_seas100_occ98_recc99, \
  description: 'water_seas100_occ98_recc99',\
  region: aoi,\
  scale: 30, \
  maxPixels: 1000000000000\
  \})\
\
\
\
\
\
var vis2 = \{min: 1, max: 5, palette: ['0000ff', '00FF00', '808000', '008080','008000']\};\
Map.addLayer(water_seas100_occ98_recc99, vis2, 'water')\
\
\
/////////////////// ERODE ///////////////////////////\
// load required modules\
var M_erode_dilate = require('users/laraschmitt1991/Master_Thesis:00_Modules/M_erode_dilate');\
\
// apply erode function \
var erode_img = M_erode_dilate.erode((water_seas100_occ98_recc99.clip(aoi)), 30)\
Map.addLayer(erode_img, \{min: 0, max: 5000, palette: ['990000', 'EDEDED']\},'eroded');\
\
print('eroded', erode_img)\
\
\
// update the image with the erode_mask\
var water_seas100_occ98_recc99 = water_seas100_occ98_recc99.updateMask(erode_img);\
Map.addLayer(water_seas100_occ98_recc99, vis2,'class_mask_loss') // put the classified image in here \
\
/////////////////////////////export eroded image\
/*\
//export; runtime 6 hours\
Export.image.toAsset(\{\
  image: water_seas100_occ98_recc99,\
  description: 'water_seas100_occ98_recc99',\
  scale: 1,\
  crs: 'EPSG:4326',\
  region: aoi, \
  maxPixels: 650181625564\
\});   */}