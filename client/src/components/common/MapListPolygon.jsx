import React from "react";
import { Polygon, Popup } from "react-leaflet";
import AreaPopup from "../admin/utils/AreaPopup";

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
             <AreaPopup area={area} />
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
};

export default MapListPolygon;
