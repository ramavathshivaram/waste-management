import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useCollector } from "../../hooks/use-collertor-query.js";
import useCollectorStore from "../../stores/collectorStore.js";

const Dashboard = () => {
  const setCollector = useCollectorStore((s) => s.setCollector);
  const { data } = useCollector();

  useEffect(() => {
    if (data) {
      setCollector(data);
    }
  }, [data, setCollector]);

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full grayscale"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ React-Leaflet Marker */}
        <Marker position={[51.505, -0.09]} />
      </MapContainer>
    </div>
  );
};

export default Dashboard;
