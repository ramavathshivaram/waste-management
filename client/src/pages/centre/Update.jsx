import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createCentre } from "../../lib/api.js";
import { toast } from "sonner";
import centreStore from "../../stores/centreStore.js";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useUnassignedCentresAreas } from "../../hooks/use-area-query.js";

const Update = () => {
  const navigate = useNavigate();
  const setCentre = centreStore((state) => state.setCentre);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      maxCapacity: 500,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      operatingHours: {
        open: "09:00",
        close: "18:00",
      },
    },
  });

  const { data: areas, isLoading } = useUnassignedCentresAreas();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setValue("coordinates.latitude", coords.latitude);
        setValue("coordinates.longitude", coords.longitude);
      },
      () => toast.error("Failed to get location")
    );
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        coordinates: [
          Number(data.coordinates.longitude),
          Number(data.coordinates.latitude),
        ],
        maxCapacity: Number(data.maxCapacity),
      };

      const centre = await createCentre(payload);

      setCentre(centre);

      console.log(centre);
      toast.success("Centre updated successfully");
      navigate("/centre");
    } catch (error) {
      toast.error("Failed to update centre");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Card className="p-8 max-w-xl w-full shadow-lg border">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Update Centre Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Centre Name */}
          <div>
            <Label>Centre Name</Label>
            <Input
              {...register("name", { required: "Centre name is required" })}
              placeholder="Enter centre name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
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
              <p className="text-red-500 text-sm">{errors.areaId.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Label>Location (Auto-detected)</Label>
            <div className="flex gap-2">
              <Input readOnly {...register("coordinates.longitude")} />
              <Input readOnly {...register("coordinates.latitude")} />
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <Label>Operating Hours</Label>
            <div className="flex gap-2">
              <Input
                type="time"
                {...register("operatingHours.open", {
                  required: "Opening time required",
                })}
              />
              <Input
                type="time"
                {...register("operatingHours.close", {
                  required: "Closing time required",
                })}
              />
            </div>
          </div>

          {/* Max Capacity */}
          <div>
            <Label>Max Capacity</Label>
            <Input
              type="number"
              {...register("maxCapacity", {
                required: "Max capacity required",
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          <Button
            type="submit"
            className="w-full py-5 text-lg"
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
