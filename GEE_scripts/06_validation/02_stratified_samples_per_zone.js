{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var scarce_rainfall_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/scarce_rainfall_zone')\
//Map.addLayer(scarce_rainfall_zone)\
var southern_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/southern_zone')\
//Map.addLayer(southern_zone)\
var krishna_godavari_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/krishna_godavari_zone')\
//Map.addLayer(krishna_godavari_zone)\
var north_coastal_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/north_coastal_zone')\
//Map.addLayer(north_coastal_zone)\
\
\
\
var current = ee.Image('users/laraschmitt1991/classified_maps/subclasses_classified2019_dnn80_acc10')\
print(current)\
print(current.projection()) // EPSG:32644\
Map.addLayer(current, \{min: 1, max: 5, palette: ['lightgreen', 'lightblue', 'red', 'green', 'yellow']\}, 'classified map subclasses');\
\
///////// STRATIFIED RANDOM SAMPLING /////////////////////////////////\
//// oversample 100 per map class for all zones, except krishna zone: 200\
// export as shapefiles to Drive /// \
\
\
// stratified random sampling\
var scarce_rainfall_zone_stratified_100 = current.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 200,\
      classBand: 'classification',\
      scale: 1,\
      seed: 4,\
      region: scarce_rainfall_zone\
    \}).map(function(f) \{\
      return f.setGeometry(ee.Geometry.Point([f.get('longitude'), f.get('latitude')]))\
    \})\
\
Export.table.toDrive(scarce_rainfall_zone_stratified_100, "scarce_rainfall_zone_stratified_seed4")\
\
\
\
// stratified random sampling\
var southern_zone_stratified_100 = current.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 200,\
      classBand: 'classification',\
      scale: 1,\
      seed: 50,\
      region: southern_zone\
    \}).map(function(f) \{\
      return f.setGeometry(ee.Geometry.Point([f.get('longitude'), f.get('latitude')]))\
    \})\
\
Export.table.toDrive(southern_zone_stratified_100, "southern_zone_stratified_seed50")\
\
\
// stratified random sampling\
var north_coastal_zone_stratified_100 = current.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 200,\
      classBand: 'classification',\
      scale: 1,\
      seed: 50,\
      region: north_coastal_zone\
    \}).map(function(f) \{\
      return f.setGeometry(ee.Geometry.Point([f.get('longitude'), f.get('latitude')]))\
    \})\
\
Export.table.toDrive(north_coastal_zone_stratified_100, "north_coastal_zone_stratified_seed50")\
\
\
// stratified random sampling\
var krishna_godavari_zone_stratified_200 = current.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 300,\
      classBand: 'classification',\
      scale: 1,\
      seed: 50,\
      region: krishna_godavari_zone\
    \}).map(function(f) \{\
      return f.setGeometry(ee.Geometry.Point([f.get('longitude'), f.get('latitude')]))\
    \})\
\
Export.table.toDrive(krishna_godavari_zone_stratified_200, "krishna_godavari_zone_stratified_seed50")}