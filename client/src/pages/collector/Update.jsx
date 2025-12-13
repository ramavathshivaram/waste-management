import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createCollector } from "../../lib/api.js";
import { toast } from "sonner";

const Update = () => {
  const navigato = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await createCollector(data);
    navigato("/collector");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-2">
      <Card className="p-4 max-w-lg w-full shadow-lg border">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Update Collector Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* License Number */}
          <div className="space-y-1">
            <Label>License Number</Label>
            <Input
              type="text"
              placeholder="AP39-12345"
              {...register("licenseNumber", {
                required: "License number is required",
              })}
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-sm">
                {errors.licenseNumber.message}
              </p>
            )}
          </div>

          {/* Vehicle Number */}
          <div className="space-y-1">
            <Label>Vehicle Number</Label>
            <Input
              type="text"
              placeholder="AP 39 XX 1234"
              {...register("vehicleNumber", {
                required: "Vehicle number is required",
              })}
            />
            {errors.vehicleNumber && (
              <p className="text-red-500 text-sm">
                {errors.vehicleNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              type="text"
              placeholder="Enter description"
              {...register("desc")}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full text-lg py-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Details"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Update;
