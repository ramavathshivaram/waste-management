import { getCentreDashboard, getCentresNearByLocations } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useCentreDashboard = () => {
  return useQuery({
    queryKey: ["centre"],
    queryFn: getCentreDashboard,
  });
};
export const UseCentresNearByLocations = ({ longitude, latitude }) => {
  return useQuery({
    queryKey: ["centre", "locations", longitude, latitude],
    queryFn: () => getCentresNearByLocations(longitude, latitude),
    enabled: !!longitude && !!latitude,
  });
};
