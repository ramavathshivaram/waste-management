import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createCollector } from "../../lib/api.js";
import { useEffect } from "react";
import { toast } from "sonner";
import collectorStore from "../../stores/collectorStore.js";

const Update = () => {
  const navigate = useNavigate();
  const setCollector = collectorStore((state) => state.setCollector);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue("coordinates.latitude", latitude);
          setValue("coordinates.longitude", longitude);
        },
        (error) => {
          toast.error("Geolocation error:", error);
        }
      );
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        coordinates: [
          Number(data.coordinates.longitude),
          Number(data.coordinates.latitude),
        ],
      };

      const collector = await createCollector(payload);

      setCollector(collector);

      console.log(collector);
      toast.success("Centre updated successfully");
      navigate("/collector");
    } catch (error) {
      toast.error("Failed to update centre");
      console.error(error);
    }
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
            <Label>Location</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter location"
                {...register("coordinates.longitude", {
                  required: "Longitude is required",
                })}
              />
              <Input
                type="text"
                placeholder="Enter location"
                {...register("coordinates.latitude", {
                  required: "latitude is required",
                })}
              />
            </div>
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
