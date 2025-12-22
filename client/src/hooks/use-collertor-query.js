import { getCollectors, getCollectorMe } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useCollector = () => {
  return useQuery({
    queryKey: ["collector"],
    queryFn: getCollectors,
  });
};

export const useCollectorMe = () => {
  return useQuery({
    queryKey: ["collectorMe"],
    queryFn: getCollectorMe,
  });
}
