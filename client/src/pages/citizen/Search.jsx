import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Search = () => {
  const [centresCoordinates, setCentresCoordinates] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCentresCoordinates([latitude, longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  if (!centresCoordinates) {
    return <p className="text-center mt-10">Getting your location...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      {/* MAP PANEL */}
      <div className="lg:col-span-2 h-full">
        <MapContainer
          center={centresCoordinates}
          zoom={15}
          className="w-full h-screen grayscale"
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User Location Marker */}
          <Marker position={centresCoordinates}>
            <Popup>You are here 📍</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Search;
