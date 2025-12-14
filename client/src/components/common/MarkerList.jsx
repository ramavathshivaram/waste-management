import React from "react";
import { Marker, Popup } from "react-leaflet";
import { getLatLng } from "../../lib/utils.js";

const MarkerList = ({ list = [], label, icon }) => {
  return (
    <>
      {list.map((item) => {
        const position = getLatLng(item?.location?.coordinates);
        if (!position) return null;

        return (
          <Marker key={item._id} position={position}>
            <Popup>
              <p className="font-medium">{label}</p>
              {item?._id && (
                <p className="text-xs text-muted-foreground">
                  ID: {item._id.slice(-6)}
                </p>
              )}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MarkerList;
