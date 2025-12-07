import { getCentre } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useCentreQuery = () => {
  return useQuery({
    queryKey: ["centre"],
    queryFn: getCentre,
  });
};
