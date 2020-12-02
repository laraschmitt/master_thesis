{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // This example demonstrates the use of the pixel QA band to mask\
// clouds in surface reflectance (SR) data.  It is suitable\
// for use with any of the Landsat SR datasets.\
\
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.\
function maskL8sr(image) \{\
  // Bits 3 and 5 are cloud shadow and cloud, respectively.\
  var cloudShadowBitMask = 1 << 3;\
  var cloudsBitMask = 1 << 5;\
\
  // Get the pixel QA band.\
  var qa = image.select('pixel_qa');\
\
  // Both flags should be set to zero, indicating clear conditions.\
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)\
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));\
\
  // Return the masked image, scaled to reflectance, without the QA bands.\
  return image.updateMask(mask).divide(10000)\
      .select("B[0-9]*")\
      .copyProperties(image, ["system:time_start"]);\
\}\
\
// Map the function over one year of data.\
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')\
    .filterDate('2016-01-01', '2016-12-31')\
    .map(maskL8sr)\
\
var composite = collection.median();\
\
// Display the results.\
Map.addLayer(composite, \{bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3\});\
\
}