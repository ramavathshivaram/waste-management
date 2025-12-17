import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import L from "leaflet";
import icons from "../assets/assets.js";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getLatLng = (coords) => {
  if (!coords || coords.length !== 2) return null;
  const [lng, lat] = coords;
  if (lat === 0 && lng === 0) return null;
  return [lat, lng];
};

export const leafletIcons = {
  pickup: L.icon({
    iconUrl: icons.pickup,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),

  collector: L.icon({
    iconUrl: icons.collector,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  }),

  centre: L.icon({
    iconUrl: icons.centre,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
};