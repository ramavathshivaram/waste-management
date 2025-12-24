import React from "react";
import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { getLatLng } from "@/lib/utils";

const Map = ({routes}) => {
  return (
    <div className="w-full h-full">
      <Card className="w-full h-full p-0 overflow-hidden">
        <MapContainer
          center={[16.4892, 80.689]}
          zoom={15}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* routes.map((route) => {<Polyline key={route._id} positions={route.coordinates} />}) */}
        </MapContainer>
      </Card>
    </div>
  );
};

export default Map;
