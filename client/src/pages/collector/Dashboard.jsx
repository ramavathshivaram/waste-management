import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapRoute from "../../components/common/MapRoute.jsx";

import { useCollector } from "../../hooks/use-collertor-query.js";
import useCollectorStore from "../../stores/collectorStore.js";

const Dashboard = () => {
   const start = [17.385044, 78.486671]; // collector
   const end = [17.4065, 78.4772]; 
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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={start} />
        <Marker position={end} />
        <MapRoute from={start} to={end} />
      </MapContainer>
    </div>
  );
};

export default Dashboard;
