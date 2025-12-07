import {
  getAdmin,
  getAdminPickups,
  getAdminApprovals,
  getAdminCollectorById,
  getAdminCentreById,
} from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useAdmin = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });
};
export const useAdminPickups = () => {
  return useQuery({
    queryKey: ["admin", "pickups"],
    queryFn: getAdminPickups,
  });
};

export const useAdminApprovals = () => {
  return useQuery({
    queryKey: ["admin", "approvals"],
    queryFn: getAdminApprovals,
  });
};
export const useAdminCollector = (id) => {
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
