import { getUserPickupRequests } from "@/lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useUserAllPickupRequests = () => {
  return useQuery({
    queryKey: ["userPickupRequests"],
    queryFn: getUserPickupRequests,
  });
};

export default useUserAllPickupRequests;
