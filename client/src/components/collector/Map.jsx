import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Card } from "@/components/ui/card";

const Map = ({ pickups }) => {
  return (
    <Card className="w-full h-[400px] p-0 overflow-hidden">
      <MapContainer
        center={[16.506, 80.65]} // Vijayawada
        zoom={14}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Markers */}
           {pickups.pendingPickups.map((pos, i) => {
           console.log(pos)
         //  return <Marker key={i} position={pos} />;
        })}
      </MapContainer>
    </Card>
  );
};

export default Map;
