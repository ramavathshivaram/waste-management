import { getCollector, getCollectorMe } from "../lib/api.js";
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
  });
}
