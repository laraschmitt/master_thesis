// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(264.8, 34.8, 4)


exports.erode = function(img, distance) {
  var d = img.not().unmask(1).fastDistanceTransform(distance).sqrt()  //.multiply(ee.Image.pixelArea().sqrt())
  return img.updateMask(d.gt(distance))
}

exports.dilate = function(img, distance) {
  var d = img.fastDistanceTransform(distance).sqrt()  // .multiply(ee.Image.pixelArea().sqrt())
  return d.lt(distance).selfMask()
}

