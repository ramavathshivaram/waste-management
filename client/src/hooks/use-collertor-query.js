import {
  getCollector,
  getCollectorMe,
  getAllPendingPickups,
} from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useCollector = () => {
  return useQuery({
    queryKey: ["collector"],
    queryFn: getCollector,
  });
};

export const useCollectorMe = () => {
  return useQuery({
    queryKey: ["collectorMe"],
    queryFn: getCollectorMe,
    retry: false,
  });
}

export const usePendingPickups = () => {
  return useQuery({
    queryKey: ["pendingPickups"],
    queryFn: getAllPendingPickups,
  });
}
