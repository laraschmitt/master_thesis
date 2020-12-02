// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(264.8, 34.8, 4)

var GRAYMAP = [
{   // Dial down the map saturation.
stylers: [ { saturation: -100 } ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 20 } ],
stylers: [ { visibility: 'off' } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'road',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
 
Map.setOptions('Gray', {'Gray': GRAYMAP});

var compos2017 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2017_jan_march_32644")
var compos2018 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2018_jan_march_32644")
var compos2019 = ee.Image("users/laraschmitt1991/composites/SpecTemps_Composite_2019_jan_march_32644")

print(compos2018)

var bands_med = compos2018.select("blue_med", "green_med", "red_med")

// Define the visualization parameters.
var vizParams = {
  bands: ['red_med', 'green_med', 'blue_med'],
  min: 0,
  max: 4000,
  gamma: [0.95, 1.1, 1]
};

// Center the map and display the image.
Map.addLayer(bands_med, vizParams, 'false color composite');

