import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MapRoute from "../../components/common/MapRoute.jsx";
import { useCollector } from "../../hooks/use-collertor-query.js";
import useCollectorStore from "../../stores/collectorStore.js";

const Dashboard = () => {
  const collector = useCollectorStore((s) => s.collector);

  const { data, isLoading } = useCollector(collector);

  if (isLoading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  const start = data.location?.coordinates
    ? [data.location.coordinates[1], data.location.coordinates[0]]
    : [17.385044, 78.486671];

  const end = [17.4065, 78.4772]; // example pickup

  return (
    <div className="w-full h-full">
      <MapContainer
        center={start}
        zoom={15}
        className="w-full h-full grayscale"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={start} />
        <Marker position={end} />

        <MapRoute from={start} to={end} />
      </MapContainer>
    </div>
  );
};

export default Dashboard;
