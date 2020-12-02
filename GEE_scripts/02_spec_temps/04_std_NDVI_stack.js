// AUTOMATICALLY GENERATED: imported vars from saved link.
var CONVERT_TO_IMPORT = (
[{"type":"geometry","name":"geometry","record":{"geometries":[{"type":"Polygon","coordinates":[[[77.87179783024658,15.131145367692197],[77.87179783024658,14.030701657073669],[79.89877536930908,14.030701657073669],[79.89877536930908,15.131145367692197]]],"geodesic":false,"evenOdd":true}],"displayProperties":[{"type":"rectangle"}],"properties":{},"color":"#d63000","mode":"Geometry","shown":false,"locked":false}}])

// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(264.8, 34.8, 4)


var aoi = ee.FeatureCollection("users/laraschmitt1991/AP_borders_OSM").geometry()
//Map.addLayer(aoi)

// cloud masking function
var maskClouds = function(image) {
  
  var pixel_qa = image.select(['pixel_qa']);

  var cloud_mask = pixel_qa.bitwiseAnd(8).eq(0).and(                                 // include shadow
                   pixel_qa.bitwiseAnd(16).eq(0)).and(                               // include snow
                   pixel_qa.bitwiseAnd(32).eq(0));    

  return image.mask(cloud_mask)
              .rename('blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pixel_qa');
};


// rename function
var rename_func = function(image) {
  var image_renamed = image.rename('blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pixel_qa');
  return image_renamed;
};


/// create image collections for all three year
  
var l7_2017 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterDate('2017-01-01', '2017-03-31')
      .filterBounds(aoi)
      .select('B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa')   
var l7_2017 = l7_2017.map(rename_func)

var l8_2017 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate('2017-01-01', '2017-03-31')
      .filterBounds(aoi)
      .select('B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa')
var l8_2017 = l8_2017.map(rename_func)

var coll_2017 = ee.ImageCollection(l7_2017.merge(l8_2017));



// 2018
var l7_2018 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterDate('2018-01-01', '2018-03-31')
      .filterBounds(aoi)
      .select('B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa');   
var l7_2018 = l7_2018.map(rename_func)
  
var l8_2018 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate('2018-01-01', '2018-03-31')
      .filterBounds(aoi)
      .select('B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa');
var l8_2018 = l8_2018.map(rename_func)

var coll_2018 = ee.ImageCollection(l7_2018.merge(l8_2018));

// 2019
var l7_2019 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterDate('2019-01-01', '2019-03-31')
      .filterBounds(aoi)
      .select('B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa');   
var l7_2019 = l7_2019.map(rename_func)
 
var l8_2019 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate('2019-01-01', '2019-03-31')
      .filterBounds(aoi)
      .select('B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa');

var l8_2019 = l8_2019.map(rename_func)

      
var coll_2019 = ee.ImageCollection(l7_2019.merge(l8_2019));





/// add NDVI

var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['nir', 'red']).rename('NDVI');
  return image.addBands(ndvi);
};

// map function to all three collections
var coll_2017_withNDVI = coll_2017.map(addNDVI);
var coll_2018_withNDVI = coll_2018.map(addNDVI);
var coll_2019_withNDVI = coll_2019.map(addNDVI);


// Make a "greenest" pixel composite.
var maxNDVI_2017 = coll_2017_withNDVI.qualityMosaic('NDVI');
var maxNDVI_2018 = coll_2018_withNDVI.qualityMosaic('NDVI');
var maxNDVI_2019 = coll_2019_withNDVI.qualityMosaic('NDVI');

// Display the result.
var vizParams = {
  //bands: ['red', 'green', 'blue'],
  bands: ['swir1', 'green', 'blue'],
  min: 0,
  max: 4000,
  gamma: [0.95, 1.1, 1]
};
//Map.centerObject(maxNDVI_2017, 5)
//Map.addLayer(maxNDVI_2018.clip(geometry), vizParams, 'Greenest pixel composite', false);


// select and rename NDVI bands from all 3 years
var NDVI_2017 = maxNDVI_2017.select('NDVI').rename('NDVI_2017')
var NDVI_2018 = maxNDVI_2018.select('NDVI').rename('NDVI_2018')
var NDVI_2019 = maxNDVI_2019.select('NDVI').rename('NDVI_2019')


// test visualization for one image
//var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};
//Map.addLayer(NDVI_2017, ndwiViz, 'NDWI', false);

// stack the max NDVI bands together 
var maxNDVIstack_2017_2018_2019 = NDVI_2017.addBands(NDVI_2018).addBands(NDVI_2019)
print(maxNDVIstack_2017_2018_2019)

// mask out no data  
var mask_not = ee.Image('users/laraschmitt1991/no_data_mask')
var maxNDVIstack_2017_2018_2019 =  maxNDVIstack_2017_2018_2019.updateMask(mask_not)

//display
Map.centerObject(maxNDVIstack_2017_2018_2019)
// adjust the naming of the bands according to the method used in line 66
Map.addLayer(maxNDVIstack_2017_2018_2019, {bands: ['NDVI_2018'], min: 0.2, max: 1}, 'NDVI_black_white')






// import regions
var anantapur = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/anantapur_OSM_districts').geometry()
var chittor = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/chittor_OSM_districts').geometry()
var east_godavari = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/east_godavari_OSM_districts').geometry()
var guntur = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/guntur_OSM_districts').geometry()
var kadapa = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/kadapa_OSM_districts').geometry()
var krishna = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/krishna_OSM_districts').geometry()
var kurnool = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/kurnool_OSM_districts').geometry()
var nellore = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/nellore_OSM_districts').geometry()
var prakasam = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/prakasam_OSM_districts').geometry()
var srikakulam = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/srikakulam_OSM_districts').geometry()
var visakhapatnam = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/visakhapatnam_OSM_districts').geometry()
var vizianagaram = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/vizianagaram_OSM_districts').geometry()
var west_godavari = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/west_godavari_OSM_districts').geometry()

var scarce_rainfall_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/scarce_rainfall_zone').geometry()
var krishna_godavari_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/krishna_godavari_zone').geometry()
var southern_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/southern_zone').geometry()
var north_coastal_zone = ee.FeatureCollection('users/laraschmitt1991/AP_district_borders/north_coastal_zone').geometry()

/*

// export, runtime: 26 min 
Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'anantapur_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: anantapur,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'chittor_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: chittor,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'east_godavari_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: east_godavari,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'guntur_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: guntur,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'kadapa_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: kadapa,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'krishna_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: krishna,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'kurnool_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: kurnool,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'nellore_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: nellore,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'prakasam_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: prakasam,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'srikakulam_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: srikakulam,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'visakhapatnam_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: visakhapatnam,
  maxPixels: 697591435
});



Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'vizianagaram_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: vizianagaram,
  maxPixels: 697591435
});



Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(aoi),
  description: 'west_godavari_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis/05_maxNDVI_stack',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: west_godavari,
  maxPixels: 697591435
});



Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(scarce_rainfall_zone),
  description: 'scarce_rainfall_zone_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: scarce_rainfall_zone,
  maxPixels: 697591435
});

*/
Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(krishna_godavari_zone),
  description: 'krishna_godavari_zone_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: krishna_godavari_zone,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(southern_zone),
  description: 'southern_zone_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: southern_zone,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: maxNDVIstack_2017_2018_2019.clip(north_coastal_zone ),
  description: 'north_coastal_zone_maxNDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: north_coastal_zone ,
  maxPixels: 697591435
});
