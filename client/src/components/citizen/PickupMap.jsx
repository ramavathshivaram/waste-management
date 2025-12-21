import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationPicker from "./LocationPicker";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

const DEFAULT_CENTER = [16.5062, 80.648]; // Vijayawada fallback

const PickupMap = ({ setValue }) => {
  const [center, setCenter] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(true);
      setCenter(DEFAULT_CENTER);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setValue("coordinates.latitude", latitude);
        setValue("coordinates.longitude", longitude);

        setCenter([latitude, longitude]);
      },
      () => {
        // Permission denied or error
        setError(true);
        setCenter(DEFAULT_CENTER);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  }, [setValue]);

  if (!center) {
    return (
      <div className="h-[300px] w-full rounded-lg border border-border flex justify-center items-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <div className="space-y-1 border border-border rounded-lg">
      {error && (
        <p className="text-xs text-muted-foreground">
          Location permission denied. Showing default location.
        </p>
      )}

      <MapContainer
        center={center}
        zoom={13}
        className="h-[300px] w-full rounded-lg grayscale"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationPicker
          mark={center}
          onSelect={({ latitude, longitude }) => {
            setCenter([latitude, longitude]);
            setValue("coordinates.latitude", latitude);
            setValue("coordinates.longitude", longitude);
          }}
        />
      </MapContainer>
    </div>
  );
};

export default PickupMap;
