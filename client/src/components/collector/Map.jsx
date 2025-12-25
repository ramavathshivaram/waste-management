import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "@/components/common/RoutingMachine";

const MapView = ({ route = [] }) => {

  // Convert [lng, lat] → { lat, lng }
  const waypoints = route.map(([lng, lat]) => ({
    lat,
    lng,
  }));

  if (waypoints.length < 2) return null;

  return (
    <MapContainer
      center={[waypoints[0].lat, waypoints[0].lng]}
      zoom={13}
      className="grayscale-50"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ROUTE */}
      <RoutingMachine waypoints={waypoints} />
    </MapContainer>
  );
};

export default MapView;
