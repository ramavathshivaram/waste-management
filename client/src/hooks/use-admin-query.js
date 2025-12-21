import {
  getAdminDashboard,
  getAdminPickups,
  getAllCollectors,
  getAdminCollectorById,
  getAdminCentreById,
  getAllCentres,
  getAdminIllegalDumps,
  getAllLocations,
} from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAdminDashboard,
  });
};

export const useAdminPickups = () => {
  return useQuery({
    queryKey: ["admin", "pickups"],
    queryFn: getAdminPickups,
  });
};
export const useAdminIllegalDumps = () => {
  return useQuery({
    queryKey: ["admin", "illegal-dumps"],
    queryFn: getAdminIllegalDumps,
  });
};

export const useAdminCollectors = () => {
  return useQuery({
    queryKey: ["admin", "collectors"],
    queryFn: getAllCollectors,
  });
};

export const useAdminLocations = () => {
  return useQuery({
    queryKey: ["admin", "locations"],
    queryFn: getAllLocations,
  });
};

export const useAdminCentres = () => {
  return useQuery({
    queryKey: ["admin", "centres"],
    queryFn: getAllCentres,
  });
};
export const useAdminCollectorById = (id) => {
  return useQuery({
    queryKey: ["admin", id],
    queryFn: ({ queryKey }) => {
      const [, collectorId] = queryKey;
      return getAdminCollectorById(collectorId);
    },
    enabled: !!id,
  });
};

export const useAdminCentreById = (id) => {
  return useQuery({
    queryKey: ["admin", id],
    queryFn: ({ queryKey }) => {
      const [, centreId] = queryKey;
      return getAdminCentreById(centreId);
    },
    enabled: !!id,
  });
};
