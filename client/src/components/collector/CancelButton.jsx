import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";

const CancelButton = ({ onCancel }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Cancel reason:", data.reason);
    onCancel?.(data.reason);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Cancel</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Cancel Pickup</DialogTitle>
            <DialogDescription>
              Select a reason for cancelling this pickup
            </DialogDescription>
          </DialogHeader>

          {/* SELECT INPUT */}
          <div className="py-4 space-y-2">
            <Controller
              name="reason"
              control={control}
              rules={{ required: "Please select a reason" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen_not_available">
                      Citizen not available
                    </SelectItem>
                    <SelectItem value="wrong_address">Wrong address</SelectItem>
                    <SelectItem value="waste_not_ready">
                      Waste not ready
                    </SelectItem>
                    <SelectItem value="vehicle_issue">Vehicle issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>

            <Button type="submit" variant="destructive">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CancelButton;
