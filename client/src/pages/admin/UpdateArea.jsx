import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import AddMapCoordinatesList from "../../components/sections/AddMapCoordinatesList";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { useAreaById } from "@/hooks/use-area-query.js";
import UpdateAreaForm from "../../components/sections/UpdateAreafrom";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ClickHandler = ({ onAdd }) => {
  useMapEvents({
    click(e) {
      onAdd(e.latlng);
    },
  });
  return null;
};

const UpdateArea = () => {
  const id = useSearchParams()[0].get("id");
  const { data, isLoading } = useAreaById(id);

  const handleAddPoint = (latlng) => {
    setCoordinates((prev) => [
      ...prev,
      [latlng.lng, latlng.lat], // GeoJSON order
    ]);
  };

  const onRemovePoint = (index) => {
    setCoordinates((prev) => prev.filter((_, i) => i !== index));
  };

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (data?.area?.coordinates?.[0]) {
      setCoordinates(data.area.coordinates[0]); // GeoJSON [lng, lat]
    }
  }, [data]);

  const leafletPolygon = coordinates.map(([lng, lat]) => [lat, lng]);

  return (
    <div className="h-full grid grid-cols-3 grid-rows-3 gap-2 px-2">
      <UpdateAreaForm coordinates={coordinates} area={data} />
      <AddMapCoordinatesList
        coordinates={coordinates}
        onRemovePoint={onRemovePoint}
      />
      {/* Map */}
      <Card className="flex-1 col-span-3 row-span-2 p-0 overflow-hidden">
        <MapContainer
          center={[16.506, 80.65]} // Vijayawada
          zoom={14}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <ClickHandler onAdd={handleAddPoint} />

          {/* Markers */}
          {leafletPolygon.map((pos, i) => (
            <Marker key={i} position={pos} icon={defaultIcon} />
          ))}

          {/* Polygon */}
          {leafletPolygon.length >= 3 && (
            <Polygon
              positions={leafletPolygon}
              pathOptions={{ color: "blue", fillOpacity: 0.4 }}
            />
          )}
        </MapContainer>
      </Card>
    </div>
  );
};

export default UpdateArea;
