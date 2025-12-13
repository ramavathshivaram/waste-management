import React, { useEffect } from "react";
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
import usePickupRequestMutation from "../../hooks/citizen/queries/usePickupRequest.js";
import { toast } from "sonner";
import useUserStore from "../../stores/useUserStore.js";

const Request = () => {
  const [coords, setCoords] = React.useState([0, 0]);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      wasteType: "plastic",
      quantity: 0,
      address: "",
      mode: "once",
      scheduledDateTime: "",
    },
  });
  const { mutate, isPending } = usePickupRequestMutation();

  // handle select input
  const handleWasteType = (value) => {
    setValue("wasteType", value);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoords([longitude, latitude]);
      });
    }
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const formData = new FormData();

    formData.append("wasteType", data.wasteType);
    formData.append("quantity", data.quantity);
    formData.append("address", data.address);
    formData.append("scheduledDateTime", data.scheduledDateTime);
    formData.append("location.coordinates", coords);

    // IMPORTANT: Attach images correctly
    const files = data.images;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }

    mutate(formData);
    toast.success("Pickup request created!");
    reset();
  };

  return (
    <div className="grid place-items-center w-full h-screen pt-10">
      <Card className="border w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Request Pickup</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Waste Type */}
            <div className="space-y-2">
              <Label className="">Waste Type</Label>
              <Select onValueChange={handleWasteType}>
                <SelectTrigger className=" text-black">
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent className=" border ">
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
              <Label className="">Quantity (kg / bags)</Label>
              <Input
                className=" "
                placeholder="e.g. 2 bags"
                {...register("quantity", { required: true })}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label className="">Pickup Address</Label>
              <Textarea
                className=" "
                placeholder="Enter your address"
                {...register("address", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label className="">Mode of Pickup</Label>
              <Select onValueChange={handleWasteType}>
                <SelectTrigger className=" text-black">
                  <SelectValue placeholder="Select mode type" />
                </SelectTrigger>
                <SelectContent className=" border ">
                  <SelectItem value="once">Once</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Date & Time */}
            <div className="space-y-2">
              <Label className="">Scheduled Date & Time</Label>
              <Input
                type="datetime-local"
                className=" "
                {...register("scheduledDateTime", { required: true })}
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label className="">Upload Images</Label>
              <Input
                type="file"
                multiple
                className=" "
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
    </div>
  );
};

export default Request;
