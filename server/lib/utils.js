const turf = require("@turf/turf");

function getPolygonCentroid(polygonCoords) {
  const polygon = turf.polygon(polygonCoords);
  const centroid = turf.centroid(polygon);
  return centroid.geometry.coordinates; // [lng, lat]
}


module.exports = {
  getPolygonCentroid,
};