{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
/////////////////////////////////////////////////////\
var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM').geometry()\
\
\
// Use these bands for classification.\
var bands = [\
            'blue_med', 'green_med', 'red_med', 'nir_med', 'swir1_med', 'swir2_med',\
            'blue_std', 'green_std', 'red_std', 'nir_std', 'swir1_std', 'swir2_std',\
            'blue_p90', 'green_p90', 'red_p90', 'nir_p90', 'swir1_p90', 'swir2_p90',\
            'blue_p10', 'green_p10', 'red_p10', 'nir_p10', 'swir1_p10', 'swir2_p10',\
            'blue_mean', 'green_mean', 'red_mean', 'nir_mean', 'swir1_mean', 'swir2_mean'\
              ];\
\
// The name of the property on the points storing the class label.\
var classProperty = 'binary_id';  // 1 = cropped area; 2 = non-cropped area\
\
// import the feature matrix// training // BEST MODEL\
var training_2017  = ee.FeatureCollection('users/laraschmitt1991/training_data/combined_2017/td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2017')\
var training_2018 = ee.FeatureCollection('users/laraschmitt1991/training_data/combined_2018/td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2018')\
var training_2019 = ee.FeatureCollection('users/laraschmitt1991/training_data/combined_2019/td_peat_2017_dnn80_acc10_1400_td_noncropped_1400_2019')\
\
\
/////////////////////// train RF classifiers  ///////////////////////////////\
\
// arguments: number of trees, variables per split, default == 0 == sqrt, minLeafPopulation, bagFraction (1/3), OOB-mode = true\
var classifier_2017 = ee.Classifier.randomForest(200, 0,  1, 0.368,  true).train(\{  \
  features: training_2017,\
  classProperty: classProperty, // classProperty = column with the class label ! \
  inputProperties: bands\
\});\
\
var classifier_2018 = ee.Classifier.randomForest(200, 0, 1, 0.368,  true).train(\{  \
  features: training_2018,\
  classProperty: classProperty, \
  inputProperties: bands\
\});\
\
var classifier_2019 = ee.Classifier.randomForest(200, 0, 1, 0.368, true).train(\{  \
  features: training_2019,\
  classProperty: classProperty,  \
  inputProperties: bands\
\});\
\
\
/////////////////////// load SpecTemps Composites ///////////////////////////////\
var compos2017 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644")\
var compos2018 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2018_jan_march_32644")\
var compos2019 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644")\
\
/////////////////////////// Classify the composites //////////////////////////////////////\
\
///////////2017//////////////////////////\
var classified2017 = compos2017.classify(classifier_2017);\
var classified2017 = classified2017.rename('classfied_2017')\
\
\
//Map.addLayer(classified2017, \{min: 1, max: 2, palette: ['orange', 'grey']\}, 'classified map2017', false);\
Map.addLayer(classified2017, \{min: 1, max: 5, palette: ['yellow', 'blue', 'red', 'green', 'grey']\}, 'classified map2017', false);\
\
var classified2018 = compos2018.classify(classifier_2018);\
var classified2018 = classified2018.rename('classfied_2018')\
Map.addLayer(classified2018, \{min: 1, max: 2, palette: ['orange', 'grey']\}, 'classified map2018', false);\
\
var classified2019 = compos2019.classify(classifier_2019);\
var classified2019 = classified2019.rename('classfied_2019')\
Map.addLayer(classified2019, \{min: 1, max: 2, palette: ['orange', 'grey']\}, 'classified map2019', false);\
\
\
// Create cropped area masks and update masks on classfied images\
\
var cropped_mask_2017 = classified2017.eq(1)\
var cropped_area_2017 = classified2017.updateMask(cropped_mask_2017)\
var cropped_area_2017 = cropped_area_2017.rename('cropped_2017')\
//print('cropped_area_2017', cropped_area_2017)\
//Map.addLayer(cropped_area_2017,\{min: 1, max: 0, palette: ['ff00ff']\}, 'cropped_area_2017', false) // values: 1 for cropped; masked for non-cropped\
\
var cropped_mask_2018 = classified2018.eq(1)\
var cropped_area_2018 = classified2018.updateMask(cropped_mask_2018)\
var cropped_area_2018 = cropped_area_2018.rename('cropped_2018')\
//print('cropped_area_2018', cropped_area_2018)\
//Map.addLayer(cropped_area_2018,\{min: 1, max: 0, palette: [ 'ffa500']\}, 'cropped_area_2018', false) // values: 1 for cropped; masked for non-cropped\
\
var cropped_mask_2019 = classified2019.eq(1)\
var cropped_area_2019 = classified2019.updateMask(cropped_mask_2019)\
var cropped_area_2019 = cropped_area_2019.rename('cropped_2019')\
//print('cropped_area_2019', cropped_area_2019)\
Map.addLayer(cropped_area_2019,\{min: 1, max: 0, palette: [ '800080']\}, 'cropped_area_2019', false) // values: 1 for cropped; masked for non-cropped\
\
// create image stack\
var cropped_area_2017_2018_2019 = cropped_area_2017.addBands(cropped_area_2018).addBands(cropped_area_2019)\
\
// FOR CREATING RGB MAP OVERLAY\
Export.image.toDrive(\{\
  image: cropped_area_2017_2018_2019.clip(aoi),\
  description: 'cropped_area_masked_best_estimate_2017_2018_2019_7756_7756',\
  scale: 30,\
  crs: 'EPSG:7756', \
  region: aoi,\
  maxPixels: 697591435\
\});\
}