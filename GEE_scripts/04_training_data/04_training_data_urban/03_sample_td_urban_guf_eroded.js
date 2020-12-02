{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15140\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var GUF_AP_eroded_img = ee.Image("users/laraschmitt1991/GUF/GUF_AP_eroded_img")\
print(GUF_AP_eroded_img.projection())\
var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM').geometry()\
\
Map.addLayer(GUF_AP_eroded_img)\
Map.centerObject(GUF_AP_eroded_img, 10)\
\
\
// stratified sample in eroded areas\
// check where the points are // only sampling where value = 1??? \
var stratified = GUF_AP_eroded_img.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 350,\
      classBand: 'b1', \
      //projection: 'EPSG:4326',\
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
// export to assets (runtime 2h)\
Export.table.toAsset(stratified, "urban_points_350", "urban/urban_points_350")}