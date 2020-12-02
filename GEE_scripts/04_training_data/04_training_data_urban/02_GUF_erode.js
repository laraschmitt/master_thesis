{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
/////////////////// ERODE TO BUFFER THE URBAN AREAS TO GET ONLY RELIABLE URBAN URBAN PIXELS\
// load required modules\
var M_erode_dilate = require('users/laraschmitt1991/Master_Thesis:00_Modules/M_erode_dilate');\
\
// load guf image (unfortunately deleted the original GUF, so that i could not\
// adjust the GUF AP to the new shapefile size)\
var GUF_AP_img = ee.Image("users/laraschmitt1991/India04")\
// GUF imag has 4 classes/pixelvalues: 0, 64, 128, 64 \
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
\
\
// change the pixels with value 255 (urban) to value 1 \
var mask = GUF_AP_img.eq(255) // creates value 1 \
var mask_multiplied = mask.multiply(1)\
var urban_1_only = mask_multiplied.updateMask(mask_multiplied)\
Map.addLayer(urban_1_only, \{min: 0, max: 5000, palette: ['7CFC00', 'EDEDED']\},'urban_1_masked');\
print('urban_1_only', urban_1_only)\
\
// apply erode function \
var GUF_AP_eroded_img = M_erode_dilate.erode(urban_1_only, 30)\
Map.addLayer(GUF_AP_eroded_img, \{min: 0, max: 5000, palette: ['990000', 'EDEDED']\},'eroded');\
\
print('eroded', GUF_AP_eroded_img)\
\
//export; runtime 9 hours \
Export.image.toAsset(\{\
  image: GUF_AP_eroded_img,\
  description: 'GUF_AP_eroded_img',\
  scale: 1,\
  crs: 'EPSG:4326',\
  region: aoi, \
  maxPixels: 650181625564\
\});\
\
/////////////////////////////////////\
// stratified sample in eroded areas\
// check where the points are // only sampling where value = 1??? \
var stratified = GUF_AP_eroded_img.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 1000,\
      classBand: 'b1', \
      projection: 'EPSG:4326',\
      scale: 1,\
      region: aoi\
    \}).map(function(f) \{\
      return f.setGeometry(ee.Geometry.Point([f.get('longitude'), f.get('latitude')]))\
    \})\
\
\
print(stratified)\
Map.addLayer(stratified);\
\
\
// export to assets\
Export.table.toAsset(stratified, "urban_points_1000", "urban/urban_points_1000")}