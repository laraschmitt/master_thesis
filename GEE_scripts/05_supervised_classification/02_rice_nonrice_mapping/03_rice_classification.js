{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM').geometry()\
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
var classProperty = 'bin_rice_crop';\
\
// import the rice training dataset \
var training  = ee.FeatureCollection("users/laraschmitt1991/training_data/td_peat_800_RICE_800_OTHER_dnn80_acc10")\
\
print(training.size())\
\
var classifier = ee.Classifier.randomForest(200, 0, 1, 0.368, true).train(\{  \
  features: training,\
  classProperty: classProperty,  \
  inputProperties: bands\
\});\
\
print('RF error matrix: ', classifier.confusionMatrix());\
print('RF accuracy: ', classifier.confusionMatrix().accuracy());\
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
Map.addLayer(cropped_2017_masked)\
\
\
\
// spectemps update mask\
var spectemps_cropped_area_2017 = compos2017.updateMask(cropped_2017_masked)\
var spectemps_cropped_area_2018 = compos2018.updateMask(cropped_2018_masked)\
var spectemps_cropped_area_2019 = compos2019.updateMask(cropped_2019_masked)\
\
// Classify the composites\
var classified2017 = spectemps_cropped_area_2017.classify(classifier);\
Map.addLayer(classified2017, \{min: 3, max: 4, palette: ['56A5B3', 'FF7100']\}, 'classified rice map 2017', false);\
//Map.addLayer(classified2017, \{min: 1, max: 5, palette: ['yellow', 'blue', 'red', 'green', 'grey']\}, 'classified map2017');\
\
var classified2018 = spectemps_cropped_area_2018.classify(classifier);\
Map.addLayer(classified2018, \{min: 3, max: 4, palette: ['blue', 'grey']\}, 'classified rice map2018', false);\
\
var classified2019 = spectemps_cropped_area_2019.classify(classifier);\
Map.addLayer(classified2019, \{min: 3, max: 4, palette: ['56A5B3', 'FF7100']\}, 'classified rice map 2019', false);\
\
\
//stack\
var rice_2017_2018_2019 = classified2017.add(classified2018).add(classified2019)\
print(rice_2017_2018_2019)\
\
/*\
// export the maps to drive \
Export.image.toDrive(\{\
  image: classified2019.clip(aoi),\
  description: 'rice_classified2019',\
  scale: 30,\
  crs: 'EPSG:7756',\
  region: aoi,\
  maxPixels: 697591435 \});\
  \
*/\
\
// export to maps asset \
Export.image.toAsset(\{\
  image: classified2017,\
  description: 'rice_classified2017',\
  assetId: 'users/laraschmitt1991/classified_maps/rice_2017_7756',\
  crs: 'EPSG:7756',\
  maxPixels: 787429405,\
  region: aoi \});\
\
// export to maps asset \
Export.image.toAsset(\{\
  image: classified2018,\
  description: 'rice_classified2018',\
  assetId: 'users/laraschmitt1991/classified_maps/rice_2018_7756',\
  crs: 'EPSG:7756',\
  maxPixels: 787429405,\
  region: aoi \});\
\
// export to maps asset \
Export.image.toAsset(\{\
  image: classified2019,\
  description: 'rice_classified2019',\
  assetId: 'users/laraschmitt1991/classified_maps/rice_2019_7756',\
  crs: 'EPSG:7756',\
  maxPixels: 787429405,\
  region: aoi \});\
  \
\
////////////////////// ACCURACY ASSESSMENT///////////////////////////////////\
\
// PUT IN MY COLLECTED VALIDATION POINTS \
// Optionally, do some accuracy assessment.  Fist, add a column of\
// random uniforms to the training dataset.\
var withRandom = training.randomColumn('random');\
\
// We want to reserve some of the data for testing, to avoid overfitting the model.\
var split = 0.75;  // Roughly 75% training, 25% testing.\
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));\
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));\
\
// Trained with 75% of the data\
var trainedClassifier = ee.Classifier.gmoMaxEnt().train(\{\
  features: trainingPartition,\
  classProperty: classProperty,\
  inputProperties: bands\
\});\
\
// Classify the test FeatureCollection.\
var test = testingPartition.classify(trainedClassifier);\
\
// Print the confusion matrix.\
var confusionMatrix = test.errorMatrix(classProperty, 'classification');\
print('Confusion Matrix', confusionMatrix, confusionMatrix.accuracy());\
\
\
}