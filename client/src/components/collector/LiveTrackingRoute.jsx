import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

const LiveTrackingRoute = ({ pickup }) => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const point = [pos.coords.latitude, pos.coords.longitude];

        setPosition(point);
        setPath([point, pickup]);
      },
      console.error,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) return <p>Locating collector…</p>;

  return (
    <div className="w-full h-full">
      <MapContainer center={position} zoom={16} className="w-full h-full grayscale-50">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Collector */}
        <Marker position={position} />

        {/* Pickup */}
        <Marker position={pickup} />

        {/* Actual traveled path */}
        <Polyline positions={path} color="black" />
      </MapContainer>
    </div>
  );
};

export default LiveTrackingRoute;
