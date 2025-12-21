import { useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";

const LocationPicker = ({ mark, onSelect }) => {
  const [position, setPosition] = useState(mark);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);
      onSelect({ latitude: lat, longitude: lng });
    },
  });

  return position ? <Marker position={position} /> : null;
};

export default LocationPicker;
