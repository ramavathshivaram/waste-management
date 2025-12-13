import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const MultiStopRoute = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: points.map(([lat, lng]) => L.latLng(lat, lng)),
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 5 }],
      },
      createMarker: () => null, // hide default routing markers
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [points, map]);

  return null;
};

export default MultiStopRoute;
