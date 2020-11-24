{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // import regions\
var anantapur = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/anantapur_OSM_districts').geometry()\
var chittor = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/chittor_OSM_districts').geometry()\
var east_godavari = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/east_godavari_OSM_districts').geometry()\
var guntur = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/guntur_OSM_districts').geometry()\
var kadapa = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/kadapa_OSM_districts').geometry()\
var krishna = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/krishna_OSM_districts').geometry()\
var kurnool = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/kurnool_OSM_districts').geometry()\
var nellore = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/nellore_OSM_districts').geometry()\
var prakasam = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/prakasam_OSM_districts').geometry()\
var srikakulam = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/srikakulam_OSM_districts').geometry()\
var visakhapatnam = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/visakhapatnam_OSM_districts').geometry()\
var vizianagaram = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/vizianagaram_OSM_districts').geometry()\
var west_godavari = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/west_godavari_OSM_districts').geometry()\
\
// SOMEHOW THE AREA PERCENTAGE CALCULATIONS GOT LOST :(\
\
//merge\
var scarce_rainfall_zone = ee.FeatureCollection(anantapur.union(kurnool))\
var southern_zone = ee.FeatureCollection(chittor.union(kadapa).union(nellore))\
var krishna_godavari_zone = ee.FeatureCollection(prakasam.union(guntur).union(krishna).union(west_godavari).union(east_godavari))\
var north_coastal_zone = ee.FeatureCollection(visakhapatnam.union(vizianagaram).union(srikakulam))\
\
\
\
Export.table.toAsset(\
  scarce_rainfall_zone, \
  'scarce_rainfall_zone', \
  'AP_district_borders/scarce_rainfall_zone');\
\
\
Export.table.toAsset(\
  southern_zone, \
  'southern_zone', \
  'AP_district_borders/southern_zone');\
\
\
Export.table.toAsset(\
  krishna_godavari_zone, \
  'krishna_godavari_zone', \
  'AP_district_borders/krishna_godavari_zone');\
\
\
Export.table.toAsset(\
  north_coastal_zone, \
  'north_coastal_zone', \
  'AP_district_borders/north_coastal_zone');}