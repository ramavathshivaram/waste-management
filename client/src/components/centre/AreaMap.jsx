import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Popup, useMap } from "react-leaflet";

const toLeafletCoords = (coords) => coords.map(([lng, lat]) => [lat, lng]);

const ZoomToArea = ({ polygon }) => {
  const map = useMap();

  useEffect(() => {
    if (polygon?.length) {
      map.fitBounds(polygon, { padding: [30, 30] });
    }
  }, [polygon, map]);

  return null;
};

const AreaMap = ({ areas = [] }) => {
  const [selectedArea, setSelectedArea] = useState(null);

  // Auto-fit first area
  const firstPolygon =
    areas.length > 0 ? toLeafletCoords(areas[0].area.coordinates[0]) : null;

  return (
    <MapContainer
      center={[16.5, 80.6]} // fallback (Vijayawada)
      zoom={12}
        style={{ height: "100%", width: "100%" }}
        className="grayscale-50"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomToArea
        polygon={
          selectedArea
            ? toLeafletCoords(selectedArea.area.coordinates[0])
            : firstPolygon
        }
      />

      {areas.map((area) => {
        const polygon = toLeafletCoords(area.area.coordinates[0]);
        const isActive = selectedArea?._id === area._id;

        return (
          <Polygon
            key={area._id}
            positions={polygon}
            eventHandlers={{
              click: () => setSelectedArea(area),
            }}
            pathOptions={{
              color: isActive ? "#2563eb" : "#22c55e",
              weight: isActive ? 3 : 2,
              fillOpacity: isActive ? 0.5 : 0.3,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{area.name}</p>
                <p className="text-sm">
                  Collector: {area.collector?.name || "—"}
                </p>
                <p className="text-sm">
                  Pending Pickups: {area.pendingCount ?? 0}
                </p>
              </div>
            </Popup>
          </Polygon>
        );
      })}

      {/* {selectedArea?.collector?._id && (
        <CollectorLiveMarker collectorId={selectedArea.collector._id} />
      )} */}
    </MapContainer>
  );
};

export default AreaMap;
