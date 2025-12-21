import { getCentreDashboard, getCentresNearByLocations } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useCentreDashboard = () => {
  return useQuery({
    queryKey: ["centre"],
    queryFn: getCentreDashboard,
  });
};

export const useCentresNearByLocations = (coords) => {
  const longitude = coords?.longitude;
  const latitude = coords?.latitude;

  return useQuery({
    queryKey: ["centres", "nearby", longitude, latitude],
    queryFn: () => getCentresNearByLocations(longitude, latitude),

    enabled: typeof longitude === "number" && typeof latitude === "number",

    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000,
    retry: 1,
  });
};
