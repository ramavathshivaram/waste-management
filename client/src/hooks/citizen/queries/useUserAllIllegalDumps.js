import { getUserDumps } from "@/lib/api.js";
import { useQuery } from "@tanstack/react-query";

 const useUserAllIllegalDumps = () => {
  return useQuery({
    queryKey: ["userIllegalDumps"],
    queryFn: getUserDumps,
  });
};


export default useUserAllIllegalDumps