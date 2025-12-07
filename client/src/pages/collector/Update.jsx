import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateCollector } from "../../lib/api.js";
import { toast } from "sonner";

const Update = () => {
  const navigato = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    const vehicle = {
      number: data.vehicleNumber,
      type: data.vehicleType,
      capacity: {
        max: Number(data.maxCapacity),
      },
    };

    formData.append("licenseNumber", data.licenseNumber);
    formData.append("vehicle", JSON.stringify(vehicle));

    const file = data.images?.[0];
    if (file) {
      formData.append("image", file);
    }

    await updateCollector(formData);

    navigato("/collector");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Card className="p-8 max-w-xl w-full shadow-lg border">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
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

          {/* Vehicle Type */}
          <div className="space-y-1">
            <Label>Vehicle Type</Label>
            <select
              {...register("vehicleType", {
                required: "Vehicle type is required",
              })}
              className="w-full p-3 border rounded-md bg-white"
            >
              <option value="">Select Vehicle Type</option>
              <option value="truck">Truck</option>
              <option value="auto">Auto</option>
              <option value="cycle-cart">Cycle Cart</option>
              <option value="van">Van</option>
              <option value="bike">Bike</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-sm">
                {errors.vehicleType.message}
              </p>
            )}
          </div>

          {/* Max Capacity */}
          <div className="space-y-1">
            <Label>Max Capacity</Label>
            <Input
              type="number"
              placeholder="200"
              {...register("maxCapacity", {
                required: "Max capacity required",
                valueAsNumber: true,
              })}
            />
            {errors.maxCapacity && (
              <p className="text-red-500 text-sm">
                {errors.maxCapacity.message}
              </p>
            )}
          </div>

          {/* Vehicle Image Upload */}
          <div className="space-y-2">
            <Label>Vehicle Image</Label>
            <Input
              type="file"
              {...register("images")}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Vehicle Preview"
                className="w-40 h-32 object-cover mt-2 rounded-md border"
              />
            )}
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
