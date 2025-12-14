import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import L from "leaflet";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getLatLng = (coords) => {
  if (!coords || coords.length !== 2) return null;
  const [lng, lat] = coords;
  if (lat === 0 && lng === 0) return null;
  return [lat, lng];
};

export const pickupIcon = L.icon({
  iconUrl: "/icons/pickup-marker.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
