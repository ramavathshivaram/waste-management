const isValidPolygon = (coordinates) => {
  if (!Array.isArray(coordinates) || !Array.isArray(coordinates[0]))
    return false;

  const ring = coordinates[0];

  if (ring.length < 4) return false;

  const first = ring[0];
  const last = ring[ring.length - 1];

  return first[0] === last[0] && first[1] === last[1];
};

module.exports = {
   isValidPolygon
}