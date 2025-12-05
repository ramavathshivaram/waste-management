import { getUserPickupRequests } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const useUserAllPickupRequests = () => {
  return useQuery({
    queryKey: ["userPickupRequests"],
    queryFn: getUserPickupRequests,
  });
};

export default useUserAllPickupRequests;
