import React from "react";
import { Polygon, Popup } from "react-leaflet";

const MapListPolygon = ({ areas = [] }) => {
  return (
    <>
      {areas.map((area) => {
        // Convert GeoJSON → Leaflet format
        const positions = area.area.coordinates[0].map(([lng, lat]) => [
          lat,
          lng,
        ]);

        return (
          <Polygon
            key={area._id}
            positions={positions}
            pathOptions={{
              color: area.collectorId ? "green" : "red",
              fillOpacity: 0.3,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{area.name}</p>
                <p>
                  Collector: {area.collectorId ? "Assigned" : "Not Assigned"}
                </p>
                <p>Centre: {area.centreId ? "Assigned" : "Not Assigned"}</p>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
};

export default MapListPolygon;
