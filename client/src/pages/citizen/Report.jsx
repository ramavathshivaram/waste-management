import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useCreateIllegalDump from "../../hooks/citizen/queries/useCreateIllegalDump.js";
import { toast } from "sonner";
import PickupMap from "../../components/citizen/PickupMap";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const { mutate, isLoading } = useCreateIllegalDump();

  // ⭐ Watch file input
  const images = watch("images");

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("priority", data.priority);
    formData.append("coordinates", JSON.stringify(data.coordinates));

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success("submitted successfully!");
        reset();
        navigate("/citizen");
      },
      onError: () => {
        toast.error("Failed to submit report");
      },
    });
    toast.success("Report submitting please wait...");
  };

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto">
        <Card className="border  ">
          <CardHeader>
            <CardTitle className="text-lg font-semibold ">
              Submit a Dumping Report
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <PickupMap setValue={setValue} />

              <div>
                <Label className="">Coordinates</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    {...register("coordinates.latitude")}
                    readOnly
                  />
                  <Input
                    type="text"
                    {...register("coordinates.longitude")}
                    readOnly
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label className="">Address</Label>
                <Input
                  className="  "
                  placeholder="Street / Area"
                  {...register("address", {
                    required: true,
                  })}
                />
              </div>

              <div>
                <Label className="">Priority</Label>
                <Select onValueChange={(value) => setValue("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label className="">Upload Images</Label>
                <Input
                  type="file"
                  multiple
                  className="  "
                  onChange={(e) => setValue("images", e.target.files)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="">Description</Label>
                <Textarea
                  className="  "
                  placeholder="Describe the issue..."
                  {...register("description", { required: true })}
                />
              </div>

              {/* Submit */}
              <Button
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-900"
                type="submit"
              >
                {isLoading ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
