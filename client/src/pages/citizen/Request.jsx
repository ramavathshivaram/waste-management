import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import usePickupRequestMutation from "../../hooks/citizen/queries/usePickupRequest.js";
import PickupMap from "../../components/citizen/PickupMap.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Request = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      address: "",
      mode: "once",
      coordinates: {
        latitude: "",
        longitude: "",
      },
    },
  });

  const { mutate } = usePickupRequestMutation();

  const onSubmit = async (data) => {
    data.coordinates = [
      Number(data.coordinates.longitude),
      Number(data.coordinates.latitude),
    ];

    mutate(data, {
      onSuccess: () => {
        navigate("/citizen");
      },
    });
  };

  return (
    <div className="grid place-items-center w-full pt-10">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Request Pickup</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Location */}
            <div className="space-y-2">
              <Label>Select Pickup Location</Label>

              <PickupMap setValue={setValue} />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  {...register("coordinates.latitude", {
                    required: true,
                  })}
                />
                <Input
                  {...register("coordinates.longitude", {
                    required: true,
                  })}
                />
              </div>
              {errors.coordinates && (
                <p className="text-red-500 text-sm">Coordinates are required</p>
              )}
            </div>

            {/* Mode */}
            <div className="space-y-2">
              <Label>Mode of Pickup</Label>
              <div className="flex gap-10">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="once"
                    value="once"
                    {...register("mode")}
                    className="accent-primary"
                  />
                  <Label htmlFor="once">Once</Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="daily"
                    value="daily"
                    {...register("mode")}
                    className="accent-primary"
                  />
                  <Label htmlFor="daily">Daily</Label>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label>Pickup Address</Label>
              <Textarea
                placeholder="Enter your address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
            </div>

            {/* Submit */}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Request;
