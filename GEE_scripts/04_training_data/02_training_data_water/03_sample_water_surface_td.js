{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var water_seas100_occ95_recc95_eroded  = ee.Image('users/laraschmitt1991/water/water_seas100_occ95_recc95_eroded')\
print(water_seas100_occ95_recc95_eroded.projection())\
var aoi = ee.FeatureCollection('users/laraschmitt1991/AP_borders_OSM')\
Map.addLayer(water_seas100_occ95_recc95_eroded)\
// have to zoom in a lot te be able to see it !!! \
\
// stratified random sampling\
var stratified = water_seas100_occ95_recc95_eroded.addBands(ee.Image.pixelLonLat())\
    .stratifiedSample(\{\
      numPoints: 350,\
      classBand: 'occurrence',\
      //projection: 'EPSG:4326', takes automatically projection of the image\
      scale: 1,\
      region: aoi\
    \}).map(function(f) \{\
      return f.setGeometry(ee.Geometry.Point([f.get('longitude'), f.get('latitude')]))\
    \})\
\
print(stratified)\
Map.addLayer(stratified);\
\
\
\
// Export; runtime 2 h \
Export.table.toAsset(stratified, 'water_points_350', 'water/water_points_350');\
}