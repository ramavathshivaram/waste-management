import { getAdmin, getAdminPickups } from "../lib/api.js";
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
