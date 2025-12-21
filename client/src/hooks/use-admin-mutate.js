import { approve, createArea } from "../lib/api.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApprove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => approve(obj),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["admin", id]);
    },

    onError: (error) => {
      console.error("Error approving collector:", error.message);
    },
  });
};

export const useCreateArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => createArea(obj),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["admin", "areas"]);
    },

    onError: (error) => {
      console.error("Error approving collector:", error.message);
    },
  });
};
