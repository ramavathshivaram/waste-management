import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useAdminLocations } from "../../hooks/use-admin-query.js";
import MarkerList from "./MarkerList.jsx";

const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
};

const AdminMapDetails = ({ filters }) => {
  const [currentCentre, setCurrentCentre] = useState(null);

  const { data, isLoading } = useAdminLocations();
  console.log(data);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCentre([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  if (!currentCentre || isLoading) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        Fetching location…
      </Card>
    );
  }

  const showAll = filters.length === 0;
  const showPickups = showAll || filters.includes("pickups");
  const showCollectors = showAll || filters.includes("collectors");
  const showCentres = showAll || filters.includes("centres");

  return (
    <Card className="overflow-hidden p-0 flex-1 h-full">
      <MapContainer
        center={currentCentre}
        zoom={15}
        className="w-full h-full grayscale"
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <RecenterMap position={currentCentre} />

        <Marker position={currentCentre}>
          <Popup>You are here 📍</Popup>
        </Marker>

        {showPickups && (
          <MarkerList list={data?.pickups} label="Pickup Request" />
        )}

        {showCollectors && (
          <MarkerList list={data?.collector} label="Collector" />
        )}

        {showCentres && <MarkerList list={data?.centres} label="Centre" />}
      </MapContainer>
    </Card>
  );
};

export default AdminMapDetails;
