import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { createPickupRequest } from "../../lib/api.js";
import usePickupRequestMutation from "../../hooks/usePickupRequest.js";

const Request = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const { mutate, isPending } = usePickupRequestMutation();

  // handle select input
  const handleWasteType = (value) => {
    setValue("wasteType", value);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const formData = new FormData();

    formData.append("wasteType", data.wasteType);
    formData.append("quantity", data.quantity);
    formData.append("address", data.address);
    formData.append("scheduledDateTime", data.scheduledDateTime);

    // IMPORTANT: Attach images correctly
    const files = data.images;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }

    mutate(formData);
    reset();
  };

  return (
    <Card className="border border-black bg-white text-black w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Request Pickup</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Waste Type */}
          <div className="space-y-2">
            <Label className="text-black">Waste Type</Label>
            <Select onValueChange={handleWasteType}>
              <SelectTrigger className="border-black bg-white text-black">
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-black text-black">
                <SelectItem value="plastic">Plastic</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="e-waste">E-Waste</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label className="text-black">Quantity (kg / bags)</Label>
            <Input
              className="border-black bg-white text-black"
              placeholder="e.g. 2 bags"
              {...register("quantity", { required: true })}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label className="text-black">Pickup Address</Label>
            <Textarea
              className="border-black bg-white text-black"
              placeholder="Enter your address"
              {...register("address", { required: true })}
            />
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <Label className="text-black">Scheduled Date & Time</Label>
            <Input
              type="datetime-local"
              className="border-black bg-white text-black"
              {...register("scheduledDateTime", { required: true })}
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label className="text-black">Upload Images</Label>
            <Input
              type="file"
              multiple
              className="border-black bg-white text-black"
              {...register("images")}
            />
          </div>

          {/* Submit */}
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            type="submit"
          >
            {isPending ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Request;
