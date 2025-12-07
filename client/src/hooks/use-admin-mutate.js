import { approveCollector } from "../lib/api.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApproveCollector = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => approveCollector(obj),

    // Runs on success
    onSuccess: (_, id) => {
      console.log("Collector approved:", id);

      // Refetch collector data
      queryClient.invalidateQueries(["adminCollector", id]);
    },

    onError: (error) => {
      console.error("Error approving collector:", error.message);
      // toast.error("Failed to approve collector");
    },
  });
};
