import { createCollector } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

const useCreateCollector = () => {
  return useQuery({
    queryKey: ["create-collector"],
    queryFn: createCollector,
  });
};

export default useCreateCollector;
