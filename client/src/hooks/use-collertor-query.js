import { getCollectors, createCollector } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useCollector = () => {
  return useQuery({
    queryKey: ["collector"],
    queryFn: getCollectors,
  });
};
