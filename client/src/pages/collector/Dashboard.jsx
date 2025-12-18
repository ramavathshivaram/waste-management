import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapRoute from "../../components/common/MapRoute.jsx";

import { useCollector } from "../../hooks/use-collertor-query.js";
import useCollectorStore from "../../stores/collectorStore.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const setCollector = useCollectorStore((s) => s.setCollector);
  const navigate = useNavigate();

  const { data } = useCollector();

  useEffect(() => {
    if (data) {
      if (data.isAdminVerified === false) {
        navigate(`/collector/under-process`);
      } else if (data.isApproved === false) {
        navigate(`/collector/rejected`);
      }
      setCollector(data);
    }
    else {
      navigate(`/collector/update`);
    }


  }, [data, setCollector]);

  const start = [17.385044, 78.486671]; // collector
  const end = [17.4065, 78.4772];

  return (
    <div className="w-full h-full">
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
