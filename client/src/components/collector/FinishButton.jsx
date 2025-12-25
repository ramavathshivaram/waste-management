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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm, Controller } from "react-hook-form";

const FinishButton = ({ onFinish }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log("OTP Submitted:", data.otp);
    onFinish?.(data.otp);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Finish</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Finish Pickup</DialogTitle>
            <DialogDescription>
              Enter the OTP provided by the citizen
            </DialogDescription>
          </DialogHeader>

          {/* OTP INPUT */}
          <div className="flex justify-center py-4">
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be 4 digits",
                },
              }}
              render={({ field }) => (
                <InputOTP
                  maxLength={4}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>

          {errors.otp && (
            <p className="text-sm text-red-500 text-center">
              {errors.otp.message}
            </p>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              Finish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FinishButton;
