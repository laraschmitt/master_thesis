{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28300\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // This example demonstrates the use of the Landsat 8 QA band to mask clouds.\
\
// Function to mask clouds using the quality band of Landsat 8.\
var maskL8 = function(image) \{\
  var qa = image.select('BQA');\
  /// Check that the cloud bit is off.\
  // See https://landsat.usgs.gov/collectionqualityband\
  var mask = qa.bitwiseAnd(1 << 4).eq(0);\
  return image.updateMask(mask);\
\}\
\
// Map the function over one year of Landsat 8 TOA data and take the median.\
var composite = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')\
    .filterDate('2016-01-01', '2016-12-31')\
    .map(maskL8)\
    .median();\
\
// Display the results in a cloudy place.\
Map.setCenter(114.1689, 22.2986, 12);\
Map.addLayer(composite, \{bands: ['B4', 'B3', 'B2'], max: 0.3\});\
}