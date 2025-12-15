import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getLatLng } from "@/lib/utils";
import createRedClusterIcon from "./createRedClusterIcon";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Custom pickup icon
const pickupIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const center = [17.385044, 78.486671]; // Hyderabad

const pickups = [
  {
    _id: "pick_001",
    status: "pending",
    location: { coordinates: [78.486671, 17.385044] },
  },
  {
    _id: "pick_002",
    status: "pending",
    location: { coordinates: [78.48712, 17.38552] },
  },
  {
    _id: "pick_003",
    status: "completed",
    location: { coordinates: [78.48589, 17.38478] },
  },
  {
    _id: "pick_004",
    status: "pending",
    location: { coordinates: [78.4863, 17.3859] },
  },
  {
    _id: "pick_005",
    status: "pending",
    location: { coordinates: [78.407067, 17.494793] },
  },
  {
    _id: "pick_006",
    status: "completed",
    location: { coordinates: [78.40821, 17.49532] },
  },
  {
    _id: "pick_007",
    status: "pending",
    location: { coordinates: [78.40678, 17.49412] },
  },
  {
    _id: "pick_008",
    status: "completed",
    location: { coordinates: [78.356777, 17.440081] },
  },
  {
    _id: "pick_009",
    status: "pending",
    location: { coordinates: [78.3572, 17.43955] },
  },
  {
    _id: "pick_010",
    status: "pending",
    location: { coordinates: [78.35592, 17.4408] },
  },
  {
    _id: "pick_011",
    status: "pending",
    location: { coordinates: [78.552145, 17.345698] },
  },
  {
    _id: "pick_012",
    status: "completed",
    location: { coordinates: [78.553, 17.3462] },
  },
  {
    _id: "pick_013",
    status: "pending",
    location: { coordinates: [78.4983, 17.4335] },
  },
  {
    _id: "pick_014",
    status: "pending",
    location: { coordinates: [78.4991, 17.4328] },
  },
  {
    _id: "pick_015",
    status: "completed",
    location: { coordinates: [78.4977, 17.4342] },
  },
];

const PickupCluster = () => {
  return (
    <div>
      <MapContainer
        center={center}
        zoom={10}
        className="w-full h-[300px] rounded-xl"
      >
        {/* REQUIRED TILE LAYER */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* PICKUP CLUSTERS */}
        <MarkerClusterGroup
          chunkedLoading
          spiderfyOnMaxZoom
          iconCreateFunction={createRedClusterIcon}
          showCoverageOnHover={false}
        >
          {pickups.map((pickup) => {
            const position = getLatLng(pickup.location?.coordinates);
            if (!position) return null;

            return (
              <Marker key={pickup._id} position={position} icon={pickupIcon}>
                <Popup>
                  <p className="font-medium">Pickup Request</p>
                  <p className="text-xs">ID: {pickup._id.slice(-6)}</p>
                  <p className="text-xs">Status: {pickup.status}</p>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default PickupCluster;
