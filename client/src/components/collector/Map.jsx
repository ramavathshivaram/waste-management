import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";
import { Card } from "@/components/ui/card";
import { getLatLng } from "@/lib/utils";
import L from "leaflet";

/* Auto-fit map to route */
const FitRoute = ({ path }) => {
  const map = useMap();

  useEffect(() => {
    if (!path || path.length < 2) return;

    const bounds = L.latLngBounds(path.map(([lng, lat]) => [lat, lng]));

    map.fitBounds(bounds, { padding: [40, 40] });
  }, [path, map]);

  return null;
};

const Map = ({ route, pickups }) => {
  if (!route) return null;

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full p-0 overflow-hidden">
        <MapContainer
          className="w-full h-full grayscale-50"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Polyline
            positions={route.path.map(([lng, lat]) => [lat, lng])}
            color="black"
            weight={2}
          />

          {/* ✅ Auto zoom */}
          <FitRoute path={route.path} />

          {/* ✅ Pickup markers */}
          {pickups.map((pickup) => {
            const position = getLatLng(pickup.location.coordinates);
            if (!position) return null;

            return <Marker key={pickup._id} position={position} />;
          })}
        </MapContainer>
      </Card>
    </div>
  );
};

export default Map;
