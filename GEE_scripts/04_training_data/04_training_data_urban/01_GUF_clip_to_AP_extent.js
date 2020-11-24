{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
var guf_india_image = ee.Image("users/laraschmitt1991/India04")\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
var GUF_AP_img = guf_india_image.clip(aoi)\
print(GUF_AP_img.projection()) // EPSG 4326\
\
\
// export: runtime 18 min\
Export.image.toAsset(\{\
  image: GUF_AP_img,\
  description: 'GUF_AP_img',\
  scale: 30,\
  crs: 'EPSG:4326',\
  region: aoi,\
  maxPixels: 731348187\
\});\
\
\
\
}