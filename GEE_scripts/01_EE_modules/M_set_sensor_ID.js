// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(264.8, 34.8, 4)


/////////////////////// set sensor ID ////////////////////
exports.setSENSOR_ID = function(image) {
  var id = 'OLI_TIRS';
  var img_with_SENSOR_ID = image.set('SENSOR_ID', id);
  return img_with_SENSOR_ID};

///////////////////////SENSOR ID PROPERTY /////////////////////////////////
// To apply the simpleCloudScore algorithm to an Earth Engine mosaic of Landsat scenes, 
// set the SENSOR_ID property
// SENSOR_ID is a property of individual images. When Earth Engine makes a mosaic of many images, 
// it has to throw out individual image metadata, including the SENSOR_ID property. 
// To cloud score a mosaic, Earth Engine looks for that property and can't find it, resulting in an error.
// Set the property manually to avoid that. The sensor IDs of Landsat 5, 7 and 8 are 'TM', 'ETM+' and 
// 'OLI_TIRS', respectively.

