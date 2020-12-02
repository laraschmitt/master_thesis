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
//function
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['nir', 'red']).rename('NDVI');
  return image.addBands(ndvi);
};

// map function to all three collections
var coll_2017_withNDVI = coll_2017.map(addNDVI);
var coll_2018_withNDVI = coll_2018.map(addNDVI);
var coll_2019_withNDVI = coll_2019.map(addNDVI);

// select only NDVI bands from collections
var NDVI_2017 = coll_2017_withNDVI.select('NDVI')
print(NDVI_2017) // 1 band 
var NDVI_2018 = (coll_2018_withNDVI.select('NDVI')
var NDVI_2019 = coll_2019_withNDVI.select('NDVI')


// reduce the image collection to standard deviation of NDVI
var NDVI_2017_stdv = NDVI_2017.reduce(ee.Reducer.stdDev());
var NDVI_2018_stdv = NDVI_2018.reduce(ee.Reducer.stdDev());
var NDVI_2019_stdv = NDVI_2019.reduce(ee.Reducer.stdDev());

// stack the max NDVI bands together 
var stddev_NDVIstack_2017_2018_2019 = NDVI_2017_stdv.addBands(NDVI_2018_stdv).addBands(NDVI_2019_stdv)
print(stddev_NDVIstack_2017_2018_2019)

// mask out no data  
var mask_not = ee.Image('users/laraschmitt1991/no_data_mask')
var stddev_NDVIstack_2017_2018_2019 =  stddev_NDVIstack_2017_2018_2019.updateMask(mask_not)

//display
Map.centerObject(stddev_NDVIstack_2017_2018_2019)
// adjust the naming of the bands according to the method used in line 66
Map.addLayer(stddev_NDVIstack_2017_2018_2019, {bands: ['NDVI_2018'], min: 0.0, max: 1}, 'NDVI_std')


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




// export, runtime: 26 min 
Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'anantapur_stddev_NDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: anantapur,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'chittor_stddev_NDVIstack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: chittor,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'east_godavari_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: east_godavari,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'guntur_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: guntur,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'kadapa_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: kadapa,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'krishna_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: krishna,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'kurnool_stddev_Istack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: kurnool,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'nellore_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: nellore,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'prakasam_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: prakasam,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'srikakulam_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: srikakulam,
  maxPixels: 697591435
});

Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'visakhapatnam_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: visakhapatnam,
  maxPixels: 697591435
});



Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'vizianagaram_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: vizianagaram,
  maxPixels: 697591435
});



Export.image.toDrive({
  image: stddev_NDVIstack_2017_2018_2019.clip(aoi),
  description: 'west_godavari_stddev_stack_2017_2018_2019_32644',
  folder: 'master_thesis',
  scale: 30,
  crs: 'EPSG:32644', // 'EPSG:32644'UTM projected coordinate system for Andhra Pradesh in m 
  region: west_godavari,
  maxPixels: 697591435
});