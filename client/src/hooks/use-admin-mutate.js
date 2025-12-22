import { approve, createArea, updateArea, deleteArea } from "../lib/api.js";
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

export const useUpdateArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => updateArea(obj),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["admin", "areas"]);
    },

    onError: (error) => {
      console.error("Error approving collector:", error.message);
    },
  });
};

export const useDeleteArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteArea(id),

    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "areas"]);
    },

    onError: (error) => {
      console.error("Error deleting area:", error.message);
    },
  });
};
