import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { leafletIcons } from "../../lib/utils.js";
import L from "leaflet";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const RoutingMachine = ({ waypoints }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!waypoints || waypoints.length < 2) return;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    // ✅ Create routing control ONCE
    routingRef.current = L.Routing.control({
      waypoints: waypoints.map((p) => L.latLng(p.lat, p.lng)),
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: function (i, wp, n) {
        let icon;

        if (i === 0) {
          icon = leafletIcons.collector; // start
        } else if (i === n - 1) {
          icon = leafletIcons.centre; // end
        } else {
          icon = leafletIcons.pickup; // middle
        }

        return L.marker(wp.latLng, { icon });
      },
      lineOptions: {
        styles: [{ color: "#000000", weight: 3 }],
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [map, JSON.stringify(waypoints)]); // ✅ stable dependency

  return null;
};

export default RoutingMachine;
