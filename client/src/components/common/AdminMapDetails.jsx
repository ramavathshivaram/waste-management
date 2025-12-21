import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useAdminLocations } from "../../hooks/use-admin-query.js";
import { leafletIcons } from "../../lib/utils.js";
import MarkerList from "./MarkerList.jsx";
import { Spinner } from "@/components/ui/spinner";
import MapListPolygon from "./MapListPolygon.jsx";

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
      <Card className="p-6 text-center text-muted-foreground h-full w-full flex justify-center items-center">
        <Spinner className="size-10" />
      </Card>
    );
  }

  const showAll = filters.length === 0;
  const showPickups = showAll || filters.includes("pickups");
  const showCollectors = showAll || filters.includes("collectors");
  const showCentres = showAll || filters.includes("centres");
  const showIllegalDumps = showAll || filters.includes("illegalDumps");
  const showAreas = showAll || filters.includes("areas");

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
          <MarkerList
            list={data?.pickups}
            label="Pickup Request"
            icon={leafletIcons.pickup}
          />
        )}

        {showCollectors && (
          <MarkerList
            list={data?.collector}
            label="Collector"
            icon={leafletIcons.collector}
          />
        )}

        {showCentres && (
          <MarkerList
            list={data?.centres}
            label="Centre"
            icon={leafletIcons.centre}
          />
        )}

        {showIllegalDumps && (
          <MarkerList
            list={data?.illegalDumps}
            label="Illegal Dump"
            icon={leafletIcons?.illegalDump}
          />
        )}

        {showAreas && <MapListPolygon areas={data?.areas} />}
      </MapContainer>
    </Card>
  );
};

export default AdminMapDetails;
