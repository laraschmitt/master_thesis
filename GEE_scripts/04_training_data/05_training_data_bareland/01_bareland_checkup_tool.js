{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13900\viewh15120\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
\
\
/*///////////////////////////////////////////////////////////////////////////////////////////  \
\
Sample interpretation tool for determining reference labels for\
    a sample derived from a mapped dataset. The sample can have Landsat\
    time series information in its metadata to load faster, which can be generated\
    with the 'Save Feature Timeseries' tool. Each unique sample location much have\
    an identifier, such as 'ID'. \
\
Authors: Eric Bullock, Valerie Pasquarella\
        bullocke@bu.edu\
        github.com/bullocke\
        \
Instructions:\
  1. Define the sample path\
  2. Specify the unique sample identifier\
  3. Adjust parameters, such as start and end dates for time series\
  4. Click Run. If data was previously "loaded" in the attributes of the feature collection\
     select the checkbox for 'Load data from feature collection'.\
  5. Optionally, the 'Limit y-axis to 5/95% percentile' adjusts the y-limits of the data\
     to be adjusted according tot he data. \
  6. Enter sample ID or click 'Next' to begin. \
    \
*///////////////////////////////////////////////////////////////////////////////////////////  \
\
// INSTRUCTIONS\
\
// PARAMETERS\
\
// Define the sample from Imports or a Feature Collection.\
//var samplePath = 'users/bullocke/newEngland/newEnglandSamplesData'\
var samplePath = 'users/laraschmitt1991/bareland/tp_bareland_allyears_raw'\
// Unique sample identifier \
//var sampleIdentifier = 'ID'\
var sampleIdentifier = 'id_bare'\
\
\
// Start and end dates\
var params = ee.Dictionary(\{\
     'start': '2016-11-01',\
     'end': '2019-10-31',\
  \})\
\
\
// GLOBALS\
\
var IMAGEADDED = false\
\
\
\
// UTILITIES\
\
var miscUtils = require('projects/AREA2/public:utilities/misc')\
\
\
// BEGIN CODE\
\
var sampleName = ee.FeatureCollection(samplePath)\
\
\
var visLabels = \{\
  fontWeight: 'bold', \
  fontSize: '14px', \
  width: '510px',\
  padding: '4px 4px 4px 4px',\
  border: '1px solid black',\
  color: 'white',\
  backgroundColor: 'black',\
  textAlign: 'left'\
  \
  \}\
  \
// Filter out cloud observations\
var sampleData = sampleName.filterMetadata('mask','equals','nocloud')\
print(sampleData.limit(5))\
\
var refresh_layers = function(point) \{\
  // Refresh map at a sample location\
   var select_style = \{color: 'red',pointRadius: 4\}; \
   Map.layers().reset();\
   Map.centerObject(point.geometry(),14);\
   \
   Map.layers().set(1);\
   var pointOutline = ee.Image().byte().paint(\{\
    featureCollection: ee.FeatureCollection(point),\
    color: 1,\
    width: 4\
   \});\
   Map.addLayer(pointOutline, \{palette: 'red'\}, 'pixel');\
   Map.setOptions('SATELLITE');\
\};\
\
var getImageRegion = function(region, date) \{\
  \
  // Get Landsat image at a given date and location\
\
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')\
      .filterBounds(region)\
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')\
      .filterBounds(region)\
  \
\
\
  var col7NoClouds = collection7.map(miscUtils.stack_renamer_l4_7_C1)//.map(miscUtils.mask457)\
  var col8NoClouds = collection8.map(miscUtils.stack_renamer_l8_C1)//.map(miscUtils.mask8)\
  // VJP: Removed cloud masking for individual images\
  // (Easier for interpreters to understand)\
\
  var colNoClouds = col7NoClouds\
                      .merge(col8NoClouds)\
  var imDate = ee.Date(date)\
  var befDate = imDate.advance(-1, 'day')\
  var aftDate = imDate.advance(1, 'day')\
\
  var selectedImage = colNoClouds.filterDate(befDate, aftDate).first()\
  Map.add(loadPanel)  \
  \
  IMAGEADDED = true // moved here\
  selectedImage.get('system:index').evaluate(function(obj) \{\
    Map.layers().set(0, ui.Map.Layer(ee.Image(selectedImage), visParams, obj), obj);\
    Map.remove(loadPanel)\
\
  \})\
  \
  return selectedImage\
  \
\}  \
var getInputsRegion = function(region, params) \{\
  // Get Landsat time series for a given location\
  var start = params.get('start')\
  var end = params.get('end')\
\
\
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')\
      .filterBounds(region)\
      .filterDate(start, end)\
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')\
      .filterBounds(region)\
      .filterDate(start, end)\
      \
\
  var col7NoClouds = collection7.map(miscUtils.mask457)\
  var col8NoClouds = collection8.map(miscUtils.mask8)\
\
  var colNoClouds = col7NoClouds\
                      .merge(col8NoClouds)\
  var colIndices = ee.ImageCollection(miscUtils.doIndices(colNoClouds, params))\
  return colIndices\
\}  \
\
var makeSinglePlotTitle = function(x, y, position, ymin, ymax, \
                                  region, color, bandName, longName,\
                                  posLabel, label, visLabels)\{\
  // Make time series plot with y axis based on data min and max\
\
  var yminNew = ee.Number(ee.List(y).reduce(ee.Reducer.min()))\
  var ymaxNew = ee.Number(ee.List(y).reduce(ee.Reducer.max()))\
\
  // Get percentiles\
  var ySorted = ee.List(y).sort()\
  var yLength = ee.Number(ySorted.length())//.add(1)\
  \
  // 10 % quantile // VJP: Changed to 1/99%\
  var quantile5 = ee.Number(yLength.multiply(.05)).toInt()\
  var quantile95 = ee.Number(yLength.multiply(.95)).toInt()\
  yminNew = ySorted.get(quantile5)\
  ymaxNew = ySorted.get(quantile95)\
  var quantileList = ee.List([yminNew,ymaxNew])\
  quantileList.evaluate(function(obj) \{\
    var q5 = obj[0]\
    var q95 = obj[1]\
    var chart = ui.Chart.array.values(y, 0, x)\
                    .setSeriesNames([bandName])\
                    .setOptions(\{\
                      title: longName,\
                      hAxis: \{'title': 'Year'\},\
                      vAxis: \{'title': bandName, viewWindow: \{min: q5, max: q95\}\},\
                      colors: [color],\
                      pointSize: 4,\
                      lineWidth: 0\}) \
    chart.onClick(function(coords) \{\
      if (coords) \{\
        // IMAGEADDED = true \
        getImageRegion(ee.Feature(region).geometry(), coords)\
      \}\
    \});\
    panel.widgets().set(posLabel, ui.Label(label, visLabels))\
    panel.widgets().set(position, chart);\
  \})\
  \
\}\
\
\
var makeSinglePlot = function(x, y, position, ymin, ymax, region, color, bandName, longName)\{\
  // Make time series plot with y axis based on data min and max\
\
  var yminNew = ee.Number(ee.List(y).reduce(ee.Reducer.min()))\
  var ymaxNew = ee.Number(ee.List(y).reduce(ee.Reducer.max()))\
\
  if (quantileButton.getValue()) \{\
    // Get percentiles\
    var ySorted = ee.List(y).sort()\
    var yLength = ee.Number(ySorted.length())//.add(1)\
    \
    // 5 % quantile // VJP: Changed to 1/99%\
    var quantile5 = ee.Number(yLength.multiply(.01)).toInt()\
    var quantile95 = ee.Number(yLength.multiply(.99)).toInt()\
    yminNew = ySorted.get(quantile5)\
    ymaxNew = ySorted.get(quantile95)\
    var quantileList = ee.List([yminNew,ymaxNew])\
    quantileList.evaluate(function(obj) \{\
      var q5 = obj[0]\
      var q95 = obj[1]\
      var chart = ui.Chart.array.values(y, 0, x)\
                      .setSeriesNames([bandName])\
                      .setOptions(\{\
                        title: longName,\
                        hAxis: \{'title': 'Year'\},\
                        vAxis: \{'title': bandName, viewWindow: \{min: q5, max: q95\}\},\
                        colors: [color],\
                        pointSize: 4,\
                        lineWidth: 0\}) \
      chart.onClick(function(coords) \{\
        if (coords) \{\
          // IMAGEADDED = true\
          getImageRegion(ee.Feature(region).geometry(), coords)\
        \}\
      \});\
      panel.widgets().set(position, chart);\
        // panel.add(chart)\
    \})\
\
  \}\
  \
  else \{\
    var chart = ui.Chart.array.values(y, 0, x)\
                      .setSeriesNames([bandName])\
                      .setOptions(\{\
                        title: longName,\
                        hAxis: \{'title': 'Year'\},\
                        vAxis: \{'title': bandName, viewWindow: \{min: yminNew, max: ymaxNew\}\},\
                        colors: [color],\
                        pointSize: 4,\
                        lineWidth: 0\}) \
    chart.onClick(function(coords) \{\
      if (coords) \{\
        // IMAGEADDED = true\
        getImageRegion(ee.Feature(region).geometry(), coords)\
      \}\
    \});\
    panel.widgets().set(position, chart); \
  \}\
\}\
\
var makeImagePlot = function(iCol, region, bandName, position, ptcolor, longName)\{\
  // Make time series plot from image collection\
  var yminNew = ee.Image(iCol.min())\
                  .reduceRegion(\{\
                    reducer: ee.Reducer.mean(),\
                    geometry: region,\
                    scale: 30\
                  \})\
  var ymaxNew = ee.Image(iCol.max())\
                  .reduceRegion(\{\
                    reducer: ee.Reducer.mean(),\
                    geometry: region,\
                    scale: 30\
                  \})\
  var chart = ui.Chart.image.series(ee.ImageCollection(iCol).select(bandName), region, ee.Reducer.mean(), 30)\
                .setOptions(\{\
                  title: longName,\
                  hAxis: \{'title': 'Year'\},\
                  vAxis: \{'title': bandName, viewWindow: \{min: yminNew, max: ymaxNew\}\},\
                  colors: [ptcolor],\
                  pointSize: 4,\
                  lineWidth: 0\
                 \});\
  chart.onClick(function(coords) \{\
    getImageRegion(ee.Feature(region).geometry(), coords)\
  \});\
  panel.widgets().set(position, chart); \
\}\
\
var makePlots = function(sampleID, point)\{\
  // Function to make all time series plots \
  var sampleDates = sampleID.aggregate_array('Date');\
\
  //var sampleEVI = sampleID.aggregate_array('EVI');\
  //var sampleEVI2 = sampleID.aggregate_array('EVI2');\
  var sampleNDVI = sampleID.aggregate_array('NDVI');\
  //var sampleNBR = sampleID.aggregate_array('NBR');\
  panel.clear()\
  panel.widgets().set(0, ui.Label('Sample Point', \{fontWeight: 'bold'\}))\
  panel.widgets().set(1, resetButton)\
  panel.widgets().set(2, select_stretch);\
  panel.widgets().set(3, quantileButton)\
  for (var i=4; i < 19; i++ ) \{\
    panel.widgets().set(i, ui.Label('Loading....'))\
  \}\
\
  panel.widgets().set(15, ui.Label('Other Indices', visLabels))\
  //makeSinglePlot(sampleDates, sampleEVI, 16, 0, 1, point, '#00D400', 'EVI', 'Enhanced Vegetation Index (EVI) x 10000')\
  //makeSinglePlot(sampleDates, sampleEVI2, 17, 0, 1, point, '#00B100', 'EVI2', '2-Band Enhanced Vegetation Index (EVI2) x 10000')\
  //makeSinglePlot(sampleDates, sampleNBR, 18, 0, 1, point, '#A06D00', 'NBR', 'Normalized Burn Ratio (NBR) x 10000')\
  makeSinglePlot(sampleDates, sampleNDVI, 19, 0, 1, point, '#6CFF00', 'NDVI', 'Normalized Difference Vegetation Index (NDVI) x 10000')\
  \}\
\
\
var setZoom = function(button, increment, cur_points) \{\
  // Zooms to the current point based on next and previous buttons\
\
  IMAGEADDED = false\
\
  var collectionLength = cur_points.size();\
\
  selectedIndex = selectedIndex + increment;\
  if (selectedIndex === 0) selectedIndex = pointTotal;\
  if (selectedIndex > (pointTotal)) selectedIndex = 1;\
\
  text_in.setValue(selectedIndex);\
  cur_point = ee.Feature(\
                    ee.FeatureCollection(cur_points.filterMetadata(sampleIdentifier, 'equals',selectedIndex))\
                      .toList(1).get(0));\
  cur_point = cur_point.buffer(14).bounds();\
  if (dataButton.getValue()) \{\
    var curPointData = sampleData.filterMetadata(sampleIdentifier,'equals',selectedIndex).sort('Date');\
    refresh_layers(cur_point);\
    makePlots(curPointData, cur_point);\
  \}\
  else \{\
    refresh_layers(cur_point);\
    notSaved(cur_point);\
  \}\
\};\
\
\
var setZoom_abs = function(cur_val,cur_points) \{\
  // Zooms to current point based on drop box selection\
\
  IMAGEADDED = false\
\
  var collectionLength = cur_points.size();\
\
  selectedIndex = parseInt(cur_val);\
  cur_point = ee.Feature(\
                    ee.FeatureCollection(cur_points.filterMetadata(sampleIdentifier, 'equals', selectedIndex))\
                      .toList(1).get(0))\
  cur_point = cur_point.buffer(14).bounds()\
  if (dataButton.getValue()) \{\
    var curPointData = sampleData.filterMetadata(sampleIdentifier,'equals',selectedIndex).sort('Date')\
    // refresh the selected point\
    refresh_layers(cur_point);\
    makePlots(curPointData,cur_point);\
    \}  else \{\
    refresh_layers(cur_point);\
    notSaved(cur_point);\
  \}\
\};\
\
var updateImage = function(viz) \{\
  var im = Map.layers().get(0)\
  im.setVisParams(viz)\
  // Map.layers().set(0, ui.Map.Layer(ee.Image(selectedImage), visParams, obj), obj);\
\
\}\
\
\
var notSaved = function(pgeo)\{\
  // Load a time series for a sample point that is not saved\
  panel.clear();\
  panel.widgets().set(2, resetButton);\
  panel.widgets().set(3, select_stretch);\
  panel.widgets().set(4, quantileButton);\
  \
  var landsatData = getInputsRegion(pgeo.geometry(), params);\
  \
  panel.widgets().set(16, ui.Label('Other Indices', visLabels))\
  //makeImagePlot(landsatData, pgeo, 'EVI', 17, '#00D400', 'Enhanced Vegetation Index (EVI) x 10000');\
  //makeImagePlot(landsatData, pgeo, 'EVI2', 18, '#00B100', '2-Band Enhanced Vegetation Index (EVI2) x 10000');\
  //makeImagePlot(landsatData, pgeo, 'NBR', 19, '#A06D00', 'Normalized Burn Ratio (NBR) x 10000');\
  makeImagePlot(landsatData, pgeo, 'NDVI', 20, '#6CFF00', 'Normalized Difference Vegetation Index (NDVI) x 10000');\
\
\}\
\
\
// On click\
Map.onClick(function(coords) \{\
  // Click on the map and load a new time series\
\
  panel.clear()\
  \
  var pgeo = ee.Geometry.Point([coords.lon, coords.lat]);\
\
  // Create or update the location label\
  var location = 'Lon: ' + coords.lon.toFixed(2) + ' ' +\
                 'Lat: ' + coords.lat.toFixed(2)\
  panel.widgets().set(1, ui.Label(location, \{fontWeight: 'bold'\}))\
  panel.widgets().set(2, resetButton)\
  panel.widgets().set(3, select_stretch)\
  panel.widgets().set(4, quantileButton)\
\
  var landsatData = getInputsRegion(pgeo, params)\
\
  // Add a dot to the map where the user clicked.\
  var point = ee.Geometry.Point(coords.lon, coords.lat);\
    var pointOutline = ee.Image().byte().paint(\{\
      featureCollection: ee.FeatureCollection(point),\
      color: 'yellow',\
      width: 4\
    \});\
  Map.addLayer(point, \{color: 'yellow'\}, 'clicked');\
\
  \
  panel.widgets().set(9, ui.Label('VIs', visLabels))\
  makeImagePlot(landsatData, pgeo, 'NDVI', 10, '#6CFF00', 'Normalized Difference Vegetation Index (NDVI) x 10000');\
  makeImagePlot(landsatData, pgeo, 'EVI2', 11, '#00B100', '2-Band Enhanced Vegetation Index (EVI2) x 10000');\
  \
/*  panel.widgets().set(9, ui.Label('Landsat Bands', visLabels))\
  makeImagePlot(landsatData, pgeo, 'Blue', 10, '#00FFFF', 'Blue reflectance x 10000');\
  makeImagePlot(landsatData, pgeo, 'Green', 11, '#00FF0C', 'Green reflectance x 10000');\
  makeImagePlot(landsatData, pgeo, 'Red', 12, '#FF5100', 'Red reflectance x 10000');\
  makeImagePlot(landsatData, pgeo, 'NIR', 13, '#FF00E0', 'Near Infrared (NIR) reflectance x 10000');\
  makeImagePlot(landsatData, pgeo, 'SWIR1', 14, '#DC00FF', 'Shortwave Infrared 1 (SWIR1) reflectance x 10000');\
  makeImagePlot(landsatData, pgeo, 'SWIR2', 15, '#A600FF', 'Shortwave Infrared 2 (SWIR2) reflectance x 10000');\
  panel.widgets().set(16, ui.Label('Other Indices', visLabels))\
  makeImagePlot(landsatData, pgeo, 'EVI', 17, '#00D400', 'Enhanced Vegetation Index (EVI) x 10000');\
  makeImagePlot(landsatData, pgeo, 'EVI2', 18, '#00B100', '2-Band Enhanced Vegetation Index (EVI2) x 10000');\
  makeImagePlot(landsatData, pgeo, 'NBR', 19, '#A06D00', 'Normalized Burn Ratio (NBR) x 10000');\
  makeImagePlot(landsatData, pgeo, 'NDVI', 20, '#6CFF00', 'Normalized Difference Vegetation Index (NDVI) x 10000');\
*/\});\
\
\
// Variables\
var selectedIndex = 0;\
var visParams = \{bands: ['RED', 'GREEN', 'BLUE'], min: 0, max: 1400\};\
var cur_point = '';\
var sampleIDs = ee.List(sampleName.aggregate_array(sampleIdentifier)).reduce(ee.Reducer.frequencyHistogram())\
var pointTotal = ''\
\
ee.Dictionary(sampleIDs).keys().size().evaluate(function(obj)\{\
  pointTotal = obj\
  Map.add(mainPanel);\
  Map.remove(loadPanel)\
\})\
\
// Quantile button\
var quantileButton = ui.Checkbox('Limit y-axis to 5/95% percentiles', false);\
\
// Load data button\
var dataButton = ui.Checkbox('Load data from feature collection', false);\
\
// Stretch button\
// start VJP mod:\
var stretch_321 = \{bands: ['RED', 'GREEN', 'BLUE'], min: 0, max: 1500\};\
var stretch_432 = \{bands: ['NIR', 'RED', 'GREEN'], min: 0, max: 4000\};\
var stretch_543 = \{bands: ['SWIR1', 'NIR', 'RED'], min: 0, max: 4000\};\
var stretch_653 = \{bands: ['SWIR2', 'SWIR2', 'RED'], min: 0, max: 4000\};\
var stretch_453 = \{bands: ['NIR', 'SWIR1', 'RED'], min: 0, max: 4000\};\
var stretch_642 = \{bands: ['SWIR2', 'NIR', 'GREEN'], min: 0, max: 5000\};\
var stretch_541 = \{bands: ['SWIR1', 'NIR', 'BLUE'], min: 0, max: 5000\};\
var stretch_641 = \{bands: ['SWIR2', 'NIR', 'BLUE'], min: 0, max: 5000\};\
var stretch_521 = \{bands: ['SWIR1', 'GREEN', 'BLUE'], min: 0, max: 2000\};\
\
// REF: https://www.harrisgeospatial.com/Learn/Blogs/\
// Blog-Details/ArtMID/10198/ArticleID/15691/\
// The-Many-Band-Combinations-of-Landsat-8\
var stretches = \{\
    'Natural Color Image (RED-GREEN-BLUE)': stretch_321,\
    'Color Infrared Image (NIR-RED-GREEN)': stretch_432,\
    'False Color Image (SWIR1-NIR-RED) - Vegetation Analysis': stretch_543,\
    'False Color Image (SWIR2-SWIR1-RED) - Urban environments': stretch_653,\
    'False Color Image (NIR-SWIR1-RED) - Land/Water': stretch_453,\
    'False Color Image (SWIR2-NIR-GREEN) - Atmospheric penetration': stretch_642,\
    'False Color Image (SWIR1-NIR-BLUE) - Agriculture': stretch_541,\
    'False Color Image (SWIR2-NIR-BLUE) - Burn scars': stretch_641,\
    'False Color Image (SWIR1-GREEN-BLUE) - Types of bare earth': stretch_521,\
   \
  \};\
\
\
var select_stretch = ui.Select(\{\
    items: Object.keys(stretches),\
    onChange: function(key) \{\
      if (IMAGEADDED === true) \{\
        visParams = stretches[key];\
        updateImage(visParams)\
      \}\
      else \{\
        visParams = stretches[key]\
      \}\
    \}\
  \});\
select_stretch.setPlaceholder('Select Band Combination');\
\
\
// Reset button\
var resetButton = ui.Button(\{\
  label: 'Reset Map Layers',\
  onClick: function() \{\
    Map.layers().reset();\
    Map.setOptions('SATELLITE');\
    var pointOutline = ee.Image().byte().paint(\{\
      featureCollection: ee.FeatureCollection(cur_point),\
      color: 1,\
      width: 4\
    \});\
    Map.addLayer(pointOutline, \{palette: 'red'\}, 'pixel');\
   \}\
\});\
  \
// Panel to hold it  \
var panel = ui.Panel(\{style: \{width: '600px'\}\})\
.add(ui.Label('TSTools Online Time Series Viewer', \{fontWeight: 'bold', fontSize: '18px'\}))\
.add(quantileButton)\
.add(dataButton)\
\
// Feature information panel \
var inspector = ui.Panel(\{style: \{shown: false, width: '200px'\}\});\
inspector.style().set(\{position: 'bottom-left'\});\
Map.add(inspector);\
\
// search and change feature\
var text_in = new ui.Textbox('Search ID');\
text_in.style().set(\{width: '80px',margin: '2px'\});\
\
// Sets up next and previous buttons used to navigate through previews of the\
// images in the collection.\
var prevButton = new ui.Button('Previous', null, false, \{margin: '0 auto 0 0'\});\
var nextButton = new ui.Button('Next', null, false, \{margin: '0 0 0 auto'\});\
var buttonPanel = new ui.Panel(\
    [prevButton, text_in, nextButton],\
    ui.Panel.Layout.Flow('horizontal'));\
    \
// Previous next and search pannel\
var mainPanel = ui.Panel(\{\
  widgets: [buttonPanel],\
  style: \{position: 'bottom-center', width: '250px'\}\
\});\
\
\
// Set up display\
Map.style().set('cursor', 'crosshair');\
Map.setOptions('SATELLITE');\
\
// Set up the next and previous buttons.\
prevButton.onClick(function(button) \{ setZoom(button, -1, sampleName); \});\
nextButton.onClick(function(button) \{ setZoom(button, 1, sampleName); \});\
text_in.onChange(function(val) \{\
  setZoom_abs(val,sampleName); \
\});\
\
var loadPanel = ui.Panel(\{\
  style: \{position: 'bottom-left', width: '250px', shown: true\}\
\});\
loadPanel.add(ui.Label('Loading...'))\
Map.add(loadPanel)\
\
// Add the panel to the ui.root.\
ui.root.add(panel);\
\
Map.setCenter(81.48, 16.69, 8);\
}