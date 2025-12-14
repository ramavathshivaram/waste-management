import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useAdminLocations } from "../../hooks/use-admin-query.js";
import {getLatLng} from '../../lib/utils.js'

const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
};

const AdminMapDetails = () => {
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

  return (
    <Card className="overflow-hidden p-0 flex-1">
      <MapContainer
        center={currentCentre}
        zoom={15}
        className="w-full h-[500px] grayscale"
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <RecenterMap position={currentCentre} />

        <Marker position={currentCentre}>
          <Popup>You are here 📍</Popup>
        </Marker>

        {data?.pickups?.map((pickup) => {
          const position = getLatLng(pickup?.location?.coordinates);
          if (!position) return null;

          return (
            <Marker key={pickup._id} position={position}>
              <Popup>
                <p className="font-medium">Pickup Request</p>
                <p className="text-xs text-muted-foreground">
                  ID: {pickup._id.slice(-6)}
                </p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Card>
  );
};

export default AdminMapDetails;
