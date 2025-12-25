import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { createCollector } from "../../lib/api.js";
import { useEffect } from "react";
import { toast } from "sonner";
import collectorStore from "../../stores/collectorStore.js";
import { useUnassignedCollectorsAreas } from "../../hooks/use-area-query.js";

const Update = () => {
  const navigate = useNavigate();
  const setCollector = collectorStore((state) => state.setCollector);
  const { data: areas = [], isLoading } = useUnassignedCollectorsAreas();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setValue("coordinates", {
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => console.error(error)
    );
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      data.coordinates = [
        Number(data.coordinates.longitude),
        Number(data.coordinates.latitude),
      ];
      const collector = await createCollector(data);
      setCollector(collector);
      navigate("/collector");
    } catch (error) {
      toast.error("Failed to update centre");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <Card className="w-full max-w-lg p-4 border shadow-lg">
        <h2 className="mb-2 text-2xl font-semibold text-center">
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
              <p className="text-sm text-red-500">
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
              <p className="text-sm text-red-500">
                {errors.vehicleNumber.message}
              </p>
            )}
          </div>
          {/* unassinged areas for collector */}
          <div className="space-y-1">
            <Label>Select Area</Label>

            <Select
              onValueChange={(value) => {
                setValue("area.id", value, {
                  shouldValidate: true,
                });
                setValue(
                  "area.name",
                  areas.find((area) => area._id === value).name,
                  {
                    shouldValidate: true,
                  }
                );
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>

              <SelectContent>
                {isLoading ? (
                  <p>Loading areas...</p>
                ) : (
                  areas.map((area) => (
                    <SelectItem key={area._id} value={area._id}>
                      {area.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            {errors.areaId && (
              <p className="text-sm text-red-500">{errors.areaId.message}</p>
            )}
          </div>

          <div>
            <Label>Location (auto filled)</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Location"
                {...register("coordinates.latitude", {
                  required: "Location is required",
                })}
              />
              <Input
                type="text"
                placeholder="Location"
                {...register("coordinates.longitude", {
                  required: "Location is required",
                })}
              />
            </div>
            {errors.areaName && (
              <p className="text-sm text-red-500">{errors.areaName.message}</p>
            )}
          </div>

          {/* Description */}
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
            className="w-full py-5 text-lg"
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Details"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Update;
