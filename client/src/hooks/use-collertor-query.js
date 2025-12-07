import { createCollector } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useCreateCollector = () => {
  return useQuery({
    queryKey: ["collector"],
    queryFn: createCollector,
  });
};
