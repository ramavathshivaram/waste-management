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

  const onSubmit = async (data) => {
    try {
      const collector = await createCollector(data);
      console.log(collector)
      setCollector(collector);
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
              <p className="text-red-500 text-sm">{errors.areaId.message}</p>
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
            className="w-full text-lg py-5"
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
