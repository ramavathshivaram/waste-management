import { useMutation } from "@tanstack/react-query";
import { createPickupRequest } from "../lib/api.js";
import { toast } from "sonner";

const usePickupRequestMutation = () => {
  return useMutation({
    mutationFn: createPickupRequest,
    onSuccess: (res) => {
      toast.success("Pickup request created!");
      console.log("Success:", res.data);
    },
    onError: (err) => {
      toast.error("Failed to create pickup request");
      console.error(err);
    },
  });
};

export default usePickupRequestMutation;
