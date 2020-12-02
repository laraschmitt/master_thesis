{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var classified_treecover_masked_loss_eroded = \
        ee.Image("users/laraschmitt1991/forest/classified_treecover_masked_loss_eroded");\
var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM').geometry()\
Map.addLayer(classified_treecover_masked_loss_eroded)\
\
///////// STRATIFIED RANDOM SAMPLING /////////////////////////////////\
\
// stratified random sampling\
var stratified = classified_treecover_masked_loss_eroded.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 87, // 800 in total \
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
//export to assets: \
Export.table.toAsset(stratified, "forest_points_350", "forest/forest_points_350") //runtime 20 min \
}