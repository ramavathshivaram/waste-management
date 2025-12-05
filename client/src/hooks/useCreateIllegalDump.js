import { createIllegalDump } from "../lib/api.js";
import { useMutation } from "@tanstack/react-query";

const useCreateIllegalDump = () => {
  return useMutation({
    mutationFn: createIllegalDump,
    onSuccess: (res) => {
      console.log("Success:", res.data);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export default useCreateIllegalDump;
