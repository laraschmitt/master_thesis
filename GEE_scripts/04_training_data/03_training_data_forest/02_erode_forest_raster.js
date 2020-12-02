{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
var hansen_image = ee.Image("UMD/hansen/global_forest_change_2018_v1_6");\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
\
//aoi negative for vis\
\
var aoi_negative = ee.FeatureCollection("users/laraschmitt1991/aoi_negative")\
//Map.addLayer(aoi_negative.draw(\{color: 'EDEDED', strokeWidth: 0\}), \{\}, 'drawn');\
\
\
var image_clipped = hansen_image.clip(aoi)\
\
// treecover 2000 band:\
// unit %, min 0, max 100\
//Map.addLayer(image_clipped,  \{bands: ['treecover2000']\}, 'treecover2000') // min: 0, max: 3000\
//Map.addLayer(aoi, \{\}, 'AOI')\
//Map.centerObject(aoi, 12)\
\
// Select band from hansen image \
var band_treecover = image_clipped.select('treecover2000');\
//print (band_treecover)\
\
/////// GENERATE AN IMAGE WITH 5 DIFFERENT TREE COVER CLASSES ////////////////////\
// generate masks for different treecover percentages (in 10/20% steps)\
// i exclude all values below 10% treecover - makes sense? \
// e.g. class1 = treecover between 10 and 20 % --> classvalue = 1 \
var mask_class0 = band_treecover.gt(0).and(band_treecover.lt(20));\
var mask_class1 = band_treecover.gt(20).and(band_treecover.lt(40));\
var mask_class2 = band_treecover.gt(40).and(band_treecover.lt(60));\
var mask_class3 = band_treecover.gt(60).and(band_treecover.lt(80));\
var mask_class4 = band_treecover.gt(80).and(band_treecover.lt(100));\
\
// select class values\
var classvalue0 = 0\
var classvalue1 = 1\
var classvalue2 = 2\
var classvalue3 = 3\
var classvalue4 = 4\
\
// create new images\
var img_class0= mask_class0.multiply(classvalue0) // has values 0 and 0\
var img_class1= mask_class1.multiply(classvalue1) // has values 0 and 1 \
var img_class2= mask_class2.multiply(classvalue2) // has values 0 and 2 \
var img_class3= mask_class3.multiply(classvalue3) // has values 0 and 3 \
var img_class4= mask_class4.multiply(classvalue4) // has values 0 and 4 \
\
\
///////////////////////////////////////////////////////////////////////\
\
// stack the bands together (from different images)\
var stacked_composite = img_class0\
                      .addBands(img_class1)\
                      .addBands(img_class2)\
                      .addBands(img_class3)\
                      .addBands(img_class4)\
\
// reduce to one band\
var classified_treecover = stacked_composite.reduce(ee.Reducer.sum())\
\
// rename band\
//print('classified_treecover_image:')\
var classified_treecover = classified_treecover.select(['sum']) \
//print(classified_treecover)\
\
\
//////////////// mask out areas with <20% treecover /////////////////////\
var mask0 = classified_treecover.eq(0);\
// use not() logical operator to invert the mask \
var mask_not0 = mask0.not()\
\
// Update the image with the masked no data areas .\
var classified_treecover_masked = classified_treecover.updateMask(mask_not0);\
\
var vis2 = \{min: 1, max: 5, palette: ['FFFF00', '00FF00', '808000', '008080','008000']\};\
print(classified_treecover_masked)\
//Map.addLayer(classified_treecover_masked, vis2, 'classified_masked')\
\
\
//////////////////// mask out forest loss areas //////////////////\
\
// Select loss band from hansen image \
// Forest loss during the study period, defined as a stand-replacement \
// disturbance (a change from a forest to non-forest state).\
var band_loss = image_clipped.select('loss');\
\
var mask_loss = band_loss.eq(0)\
\
// Update the image with the masked no data areas .\
var classified_treecover_masked_loss = classified_treecover_masked.updateMask(mask_loss);\
Map.addLayer(classified_treecover_masked_loss.clip(geometry), vis2,'class_mask_loss') // put the classified image in here \
\
/////////////////// ERODE ///////////////////////////\
// load required modules\
var M_erode_dilate = require('users/laraschmitt1991/Master_Thesis:00_Modules/M_erode_dilate');\
\
// apply erode function \
var erode_img = M_erode_dilate.erode(classified_treecover_masked_loss, 30)\
Map.addLayer(erode_img.clip(geometry), \{min: 0, max: 5000, palette: ['990000', 'EDEDED']\},'eroded');\
\
print('eroded', erode_img)\
\
// update the image with the erode_mask\
var classified_treecover_masked_loss_eroded = classified_treecover_masked_loss.updateMask(erode_img);\
Map.addLayer(classified_treecover_masked_loss_eroded.clip(geometry), vis2,'class_mask_loss') // put the classified image in here \
\
/////////////////////////////export eroded image\
\
/*\
//export; runtime 7 hours\
Export.image.toAsset(\{\
  image: classified_treecover_masked_loss_eroded,\
  description: 'classified_treecover_masked_loss_eroded',\
  assetId: 'forest/classified_treecover_masked_loss_eroded',\
  scale: 1,\
  crs: 'EPSG:4326',\
  region: aoi, \
  maxPixels: 650181625564\
\});\
\
*/\
\
///////// STRATIFIED RANDOM SAMPLING /////////////////////////////////\
\
// stratified random sampling\
var stratified = classified_treecover_masked_loss_eroded.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 250, // 1000 in total \
      classBand: 'sum',\
      //projection: 'EPSG:',\
      scale: 1,\
      region: aoi\
    \}).map(function(f) \{\
      return f.setGeometry(ee.Geometry.Point([f.get('longitude'), f.get('latitude')]))\
    \})\
\
\
print(stratified)\
Map.addLayer(stratified);\
Map.addLayer(stratified.draw(\{color: '353839', strokeWidth: 1\}), \{\}, 'drawn');\
\
////////////////////// EXPORT FOREST TRAINING POINTS ///////////////////\
\
//export to assets: runtime 8h\
Export.table.toAsset(stratified, "forest_points_1000", "forest/forest_points_1000") //runtime 20 min \
}