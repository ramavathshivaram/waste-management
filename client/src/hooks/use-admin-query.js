import {
  getAdminDashboard,
  getAdminPickups,
  getAllCollectors,
  getAdminCollectorById,
  getAdminCentreById,
  getAllCentres,
  getAdminIllegalDumps,
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
export const useAdminCentres = () => {
  return useQuery({
    queryKey: ["admin", "centres"],
    queryFn: getAllCentres,
  });
};
export const useAdminCollectorById = (id) => {
  return useQuery({
    queryKey: ["adminCollector", id],
    queryFn: ({ queryKey }) => {
      const [, collectorId] = queryKey;
      return getAdminCollectorById(collectorId);
    },
    enabled: !!id,
  });
};

export const useAdminCentre = (id) => {
  return useQuery({
    queryKey: ["adminCentre", id],
    queryFn: ({ queryKey }) => {
      const [, collectorId] = queryKey;
      return getAdminCentreById(collectorId);
    },
    enabled: !!id,
  });
};
