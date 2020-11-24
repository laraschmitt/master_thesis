// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(264.8, 34.8, 4)

/////////////////// FUNCTIONS TO RENAME BANDS TO COMMON NAMES  ////////////////////////////////////////

// in short:
//var adjustBands = landsat7.select(['B4', 'B3', 'B2', 'B1'],['B5', 'B4', 'B3','B2'])


// A mapping from a common name to the sensor-specific bands.
// function to rename bands: 
var LC8_BANDS = ['B2',   'B3',    'B4',  'B5',  'B6',    'B7',    'B10'];
var STD_NAMES = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'temp'];

exports.renameBandsETM_SR = function(image) {
    var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'];
    var new_bands = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2', 'pixel_qa'];
    return image.select(bands).rename(new_bands);
}

exports.renameBandsETM_TOA = function(image) {
    var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B7', 'BQA'];
    var new_bands = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2', 'pixel_qa'];
    return image.select(bands).rename(new_bands);
}

// apply like 
//var etm = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').map(renameBandsETM)


//rename landsat 8 SR
exports.renameBandsOLI_SR = function(image) {
    var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'pixel_qa'];
    var new_bands = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'temp', 'pixel_qa'];
    return image.select(bands).rename(new_bands);
}

//apply like: 
//var oli = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').map(renameBandsOLI_SR);

// rename landsat 8 TOA
exports.renameBandsOLI_TOA = function(image) {
    var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'BQA'];
    var new_bands = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'temp', 'pixel_qa'];
    return image.select(bands).rename(new_bands);
}

//apply like: 
//var oli = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').map(renameBandsOLI_SR);


