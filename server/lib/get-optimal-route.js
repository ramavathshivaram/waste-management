const toRad = (deg) => (deg * Math.PI) / 180;

const distanceKm = (a, b) => {
  const R = 6371;
  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);

  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return 2 * R * Math.asin(Math.sqrt(x));
};


const buildOptimalRoute = (srource, coordinates, destination) => {
  if (!coordinates.length) {
    return {
      path: [srource, destination],
      distanceKm: distanceKm(srource, destination),
    };
  }

  const unvisited =coordinates
  const route = [srource];
  let totalDistance = 0;

  let current = srource;

  // Nearest Neighbor traversal
  while (unvisited.length) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const d = distanceKm(current, unvisited[i]);
      if (d < nearestDistance) {
        nearestDistance = d;
        nearestIndex = i;
      }
    }

    const next = unvisited.splice(nearestIndex, 1)[0];
    route.push(next);
    totalDistance += nearestDistance;
    current = next;
  }

  // End at destination
  totalDistance += distanceKm(current, destination);
  route.push(destination);

  return {
    path: route, // ordered coordinates
    distanceKm: +totalDistance.toFixed(2),
  };
};


module.exports = buildOptimalRoute;