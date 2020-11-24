{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /// load module containing function\
var M_clearpix = require('users/laraschmitt1991/Master_Thesis:00_Modules/M_clearpixcountmask_SR_pixqa')\
\
///////////////////// LOAD AND FILTER DATA ///////////////////////////////////////////\
var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()\
var startDate = '2019-01-01'\
var endDate = '2019-03-31'\
\
// load surface reflectance collections, filter and select quality band\
var l8_pixel_qa = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')\
      .filterDate(startDate, endDate)\
      .filterBounds(aoi)\
      .select('pixel_qa')\
      \
var l7_pixel_qa = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')\
      .filterDate(startDate, endDate)\
      .filterBounds(aoi)\
      .select('pixel_qa')\
\
// merge collections\
var l7_l8_pixel_qa = l8_pixel_qa.merge(l7_pixel_qa)\
//print(l7_l8_pixel_qa.size()) // 187 images \
\
\
//////////////// CREATE DAILY MOSAICS ///////////////////////////\
\
//////// get a list of all occuring acquisition dates/////////// \
var date_list_str = ee.List(l7_l8_pixel_qa.aggregate_array('SENSING_TIME'));\
//print (date_list_str.get(1))\
//sensing time format: 2019-02-13T04:44:18.2892880Z\
\
// i need to extract only the date/ without time for the daily mosaic\
//regex function to replace everything after 'T'\
var replace_after = function(string)\{ \
  var ee_string = ee.String(string)\
  //match content of the first capture group\
  // = replace everything after the first whitespace\
  return ee_string.replace('T(.*)','', 'g');\}\
\
// map replace_after function to list\
var date_list_str_clean = date_list_str.map(replace_after)\
//distinct\
var date_list_str_clean_dist = date_list_str_clean.distinct()\
// as date\
var date_list_dt_dist = date_list_str_clean_dist.map(function(string)\{\
  var date = ee.Date(string)\
  return date \});\
\
//print(date_list_dt_dist) // 65 elements \
\
///////////////////////////////////////////////////////////////////////\
///// ///////Funtion for iteraton over the range of dates//////////////\
// assign collection name\
var collection = l7_l8_pixel_qa\
\
var day_mosaics = function(date, newlist) \{\
  var date = ee.Date(date)\
  newlist = ee.List(newlist)\
  var date_formatted = ee.Number.parse(date.format('YYYYMMdd'))\
  // make date band as an 32 bit unsigned integer and rename it as 'date'\
  var dateband = ee.Image.constant(date_formatted).toUint32()\
                         .rename('date')\
\
  // Filter collection for the current date\
  var filtered = collection.filterDate(date, date.advance(1, 'day'))\
\
  // Make the mosaic\
  var image = ee.Image(filtered.mosaic()) // during mosaicing loss of sensor id property probably\
                .addBands(dateband)  // add date band\
\
  // Add the mosaic to a list only if the collection has images\
  return ee.List(ee.Algorithms.If(filtered.size(), newlist.add(image), newlist))\
\}\
//////////////////////////////////////////////////////////////////////\
\
// Iterate over the range to make a new list, and then cast the list to an imagecollection\
var newcol = ee.ImageCollection(ee.List(date_list_dt_dist.iterate(day_mosaics, ee.List([]))))\
//print(newcol.size())\
\
var inspectImage = 1  // what image do you want to see?\
//Map.addLayer(newcol.filterBounds(aoi))\
//Map.addLayer(ee.Image(newcol.toList(newcol.size()).get(inspectImage)))\
\
\
/////////////////////////////////////////////////////////////////\
//map clearpixelcount function over the daily mosaic collection:\
var masked_daily_mosaics = newcol.map(M_clearpix.mask_quality_band)\
Map.addLayer(masked_daily_mosaics.first().clip(geometry))\
\
\
var sum_coll = masked_daily_mosaics.reduce(ee.Reducer.sum());\
//Map.addLayer(sum_coll)\
//print(sum_coll)\
\
\
Export.image.toDrive(\{\
  image: sum_coll.toFloat().clip(aoi),  // exporting requires all bands to be of the same type, //use function bandTypes()\
  description: 'data_availability_per_pixel_2019_l7_l8_with_qa_band_NEW',\
  scale: 30,\
  region: aoi.bounds(), //geometry\
  fileFormat: 'GeoTIFF',\
  maxPixels: 800000000,\
  \});\
\
\
\
Export.image.toAsset(\{\
  image: sum_coll.toFloat().clip(aoi), \
  description: 'export_data_availability_2019', \
  assetId: 'clear_sky_obs_2019',   \
  region: aoi.bounds(),\
  scale: 30,\
  maxPixels: 800000000\
   \});\
}