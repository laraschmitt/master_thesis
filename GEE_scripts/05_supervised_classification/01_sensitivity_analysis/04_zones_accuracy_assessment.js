{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // load zones shapefiles\
\
\
var zone_north = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/north_coastal_zone').geometry()\
var zone_krishna = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/krishna_godavari_zone').geometry()\
var zone_scarce = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/scarce_rainfall_zone').geometry()\
var zone_southern = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/southern_zone').geometry()\
\
\
///////////////// !!!!!!!!!!!!!!!!!!!! PUT IN CURRENT ZONE !!!!!!!!!!!!!!!!!!\
//var current_zone = zone_north\
var current_zone = zone_krishna\
//var current_zone = zone_scarce\
//var current_zone = zone_southern\
///////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!//////////////////////////////\
\
\
var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM').geometry()\
\
var bands = [\
            'blue_med', 'green_med', 'red_med', 'nir_med', 'swir1_med', 'swir2_med',\
            'blue_std', 'green_std', 'red_std', 'nir_std', 'swir1_std', 'swir2_std',\
            'blue_p90', 'green_p90', 'red_p90', 'nir_p90', 'swir1_p90', 'swir2_p90',\
            'blue_p10', 'green_p10', 'red_p10', 'nir_p10', 'swir1_p10', 'swir2_p10',\
            'blue_mean', 'green_mean', 'red_mean', 'nir_mean', 'swir1_mean', 'swir2_mean'\
              ];\
\
//var classProperty = 'binary_id';\
var classProperty = 'class_id';\
\
var training_2017 = ee.FeatureCollection('users/laraschmitt1991/training_data/combined_2017/td_peat_dnn80_acc10_3200_td_noncropped_3200_2017')\
var training_2018 = ee.FeatureCollection('users/laraschmitt1991/training_data/combined_2018/td_peat_dnn80_acc10_3200_td_noncropped_3200_2018')\
var training_2019 = ee.FeatureCollection('users/laraschmitt1991/training_data/combined_2019/td_peat_dnn80_acc10_3200_td_noncropped_3200_2019')\
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
// Print some info about the classifier (specific to CART).\
print('random forest, explained', classifier_2019.explain());\
\
\
// Get a confusion matrix representing resubstitution accuracy on the training data\
// = "train accuracy", basically describes how well the classifier was able to correctly label\
// resubstituted training data, i.e. data the classfier had already seen \
print('2017 RF error matrix: ', classifier_2017.confusionMatrix());\
print('2017 RF accuracy: ', classifier_2017.confusionMatrix().accuracy());\
\
print('2018 RF error matrix: ', classifier_2018.confusionMatrix());\
print('2018 RF accuracy: ', classifier_2018.confusionMatrix().accuracy());\
\
print('2019 RF error matrix: ', classifier_2019.confusionMatrix());\
print('2019 RF accuracy: ', classifier_2019.confusionMatrix().accuracy());\
\
/////////////////////// load SpecTemps Composites ///////////////////////////////\
var compos2017 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644")\
var compos2017_zone = compos2017.clip(current_zone)\
var compos2018 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2018_jan_march_32644")\
var compos2018_zone = compos2018.clip(current_zone)\
var compos2019 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644")\
var compos2019_zone = compos2019.clip(current_zone)\
/////////////////////////// Classify the composites //////////////////////////////////////\
\
///////////2017//////////////////////////\
var classified2017 = compos2017_zone.classify(classifier_2017);\
var classified2017 = classified2017.rename('classfied_2017')\
\
\
//Map.addLayer(classified2017, \{min: 1, max: 2, palette: ['orange', 'grey']\}, 'classified map2017', false);\
Map.addLayer(classified2017, \{min: 1, max: 5, palette: ['yellow', 'blue', 'red', 'green', 'grey']\}, 'classified map2017', false);\
\
var classified2018 = compos2018_zone.classify(classifier_2018);\
var classified2018 = classified2018.rename('classfied_2018')\
Map.addLayer(classified2018, \{min: 1, max: 2, palette: ['orange', 'grey']\}, 'classified map2018', false);\
\
var classified2019 = compos2019_zone.classify(classifier_2019);\
var classified2019 = classified2019.rename('classfied_2019')\
Map.addLayer(classified2019, \{min: 1, max: 2, palette: ['orange', 'grey']\}, 'classified map2019', false);\
\
// create image stack\
var classified_5_classes_2017_2018_2019 = classified2017.addBands(classified2018).addBands(classified2019)\
\
\
// export stack to asset\
Export.image.toAsset(\{\
  image: classified_5_classes_2017_2018_2019.clip(current_zone),\
  description: 'krishna_zone_80_10_model_2018_2019_7756',\
  assetId: 'classified_maps/krishna_zone_80_10_model_2018_2019_7756',\
  scale: 30,\
  crs: 'EPSG:7756', \
  region: current_zone,\
  maxPixels: 697591435\
\});\
\
///////////////////////////////////////// ACCURACY ASSESSMENT///////////////////////////////////\
\
//upload validation data sets for specific zone\
// !!!!!!!!!!!!!! COMMENT OTHERS OUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\
/*\
//north\
var ref_feat_2017 = ee.FeatureCollection('users/laraschmitt1991/validation_data/north_coas_ref_feat_2017')\
var ref_feat_2018 = ee.FeatureCollection('users/laraschmitt1991/validation_data/north_coas_ref_feat_2018')\
var ref_feat_2019 = ee.FeatureCollection('users/laraschmitt1991/validation_data/north_coas_ref_feat_2019')\
*/\
\
\
// krishna\
var ref_feat_2017 = ee.FeatureCollection('users/laraschmitt1991/validation_data/krishna_ref_feat_2017')\
var ref_feat_2018 = ee.FeatureCollection('users/laraschmitt1991/validation_data/krishna_ref_feat_2018')\
var ref_feat_2019 = ee.FeatureCollection('users/laraschmitt1991/validation_data/krishna_ref_feat_2019')\
\
/*\
// scarce\
var ref_feat_2017 = ee.FeatureCollection('users/laraschmitt1991/validation_data/scarce_ref_feat_2017')\
var ref_feat_2018 = ee.FeatureCollection('users/laraschmitt1991/validation_data/scarce_ref_feat_2018')\
var ref_feat_2019 = ee.FeatureCollection('users/laraschmitt1991/validation_data/scarce_ref_feat_2019')\
\
// southern\
var ref_feat_2017 = ee.FeatureCollection('users/laraschmitt1991/validation_data/southern_ref_feat_2017')\
var ref_feat_2018 = ee.FeatureCollection('users/laraschmitt1991/validation_data/southern_ref_feat_2018')\
var ref_feat_2019 = ee.FeatureCollection('users/laraschmitt1991/validation_data/southern_ref_feat_2019')\
\
*/\
\
// Classify the test FeatureCollections\
var test2017 = ref_feat_2017.classify(classifier_2017);\
var test2018 = ref_feat_2018.classify(classifier_2018);\
var test2019 = ref_feat_2019.classify(classifier_2019);\
\
// Print the confusion matrices (get validation accuracy// on test set)\
var confusionMatrix2017 = test2017.errorMatrix(classProperty, 'classification');\
print('Confusion Matrix 2017', confusionMatrix2017);\
print('validation accuracy 2017: ', confusionMatrix2017.accuracy(),\
'user accuracy 2017: ', confusionMatrix2017.consumersAccuracy(),\
'prod accuracy 2017: ', confusionMatrix2017.producersAccuracy());\
\
var confusionMatrix2018 = test2018.errorMatrix(classProperty, 'classification');\
print('Confusion Matrix 2018', confusionMatrix2018);\
print('validation accuracy 2018: ', confusionMatrix2018.accuracy(),\
'user accuracy 2018: ', confusionMatrix2018.consumersAccuracy(),\
'prod accuracy 2018: ', confusionMatrix2018.producersAccuracy());\
\
var confusionMatrix2019 = test2019.errorMatrix(classProperty, 'classification');\
print('Confusion Matrix 2019', confusionMatrix2019);\
print('validation accuracy 2019: ', confusionMatrix2019.accuracy(),\
'user accuracy 2019: ', confusionMatrix2019.consumersAccuracy(),\
'prod accuracy 2019: ', confusionMatrix2019.producersAccuracy());\
\
\
\
\
\
\
}