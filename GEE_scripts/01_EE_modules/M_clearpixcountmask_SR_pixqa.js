// AUTOMATICALLY GENERATED: imported vars from saved link.
var CONVERT_TO_IMPORT = (
[{"type":"geometry","name":"geometry","record":{"geometries":[{"type":"Polygon","coordinates":[[[80.24799675296674,20.628206037241387],[80.24799675296674,20.11324611124245],[80.62153190921674,20.11324611124245],[80.62153190921674,20.628206037241387]]],"geodesic":false,"evenOdd":true}],"displayProperties":[{"type":"rectangle"}],"properties":{},"color":"#0b4a8b","mode":"Geometry","shown":true,"locked":false}}])

// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(264.8, 34.8, 4)

var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterDate('2016-01-01', '2016-01-31')
    .filterBounds(geometry)

var first = collection.first()
print(first)
Map.addLayer(collection)
// This example demonstrates the use of the pixel QA band to mask
// clouds in surface reflectance (SR) data.  It is suitable
// for use with any of the Landsat SR datasets.

// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;

  // Get the pixel QA band.
  var qa = image.select('pixel_qa');

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));

  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}

// Map the function over one year of data.
var masked = collection.map(maskL8sr)

var composite = collection.median();

// Display the results.
//Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3});


////////////////////////////////////////////////////////////////


function mask_quality_band(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;

  // Get the pixel QA band.
  var qa = image.select('pixel_qa');

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // function has to return an image     
  return mask;
};

var qa = first.select('pixel_qa');
print(qa)
var cloudShadowBitMask = 1 << 3;
print(cloudShadowBitMask)
var cloudsBitMask = 1 << 5;

var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));

print(mask)
print(typeof mask)
Map.addLayer(mask)


var test = mask_quality_band(first)
print(typeof test)
Map.addLayer(test)


//var vis3 = {min: 1, max: 0, palette: [ 'FFFF00','008000']};
//Map.addLayer(test, vis3, 'mask_occ')


