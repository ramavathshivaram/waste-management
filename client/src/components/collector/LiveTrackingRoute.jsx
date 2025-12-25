import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import LiveTMapMachine from "./LiveMapMachine";

const LiveTrackingRoute = ({ pickup }) => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]);

  const pickupPoint = {
    lat: pickup[1],
    lng: pickup[0],
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const point = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setPosition(point);
        setPath([point, pickupPoint]);
      },
      console.error,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) return <p>Locating collector…</p>;

  return (
    <div className="w-full h-full">
      <MapContainer
        center={position}
        zoom={16}
        className="w-full h-full grayscale-50"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LiveTMapMachine waypoints={path} />
      </MapContainer>
    </div>
  );
};

export default LiveTrackingRoute;
