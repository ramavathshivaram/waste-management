import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useCreateIllegalDump from "../../hooks/useCreateIllegalDump.js";
import { toast } from "sonner";

const Report = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const { mutate, isLoading } = useCreateIllegalDump();

  // ⭐ Watch file input
  const images = watch("images");

  // ⭐ React Query Mutation (submits report)

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("locationText", data.locationText);
    formData.append("address", data.address);
    formData.append("description", data.description);

    // Append images properly
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    mutate(formData);
    toast.success("Report submitted successfully!");
    reset();
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Report Illegal Dumping</h1>

        <Card className="border border-black bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-black">
              Submit a Dumping Report
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Location Text */}
              <div className="space-y-2">
                <Label className="text-black">Location / Landmark</Label>
                <Input
                  className="border-black bg-white text-black"
                  placeholder="Near market, Kanuuru"
                  {...register("locationText", { required: true })}
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label className="text-black">Address (optional)</Label>
                <Input
                  className="border-black bg-white text-black"
                  placeholder="Street / Area"
                  {...register("address")}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-black">Description</Label>
                <Textarea
                  className="border-black bg-white text-black"
                  placeholder="Describe the issue..."
                  {...register("description", { required: true })}
                />
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label className="text-black">Upload Images</Label>
                <Input
                  type="file"
                  multiple
                  className="border-black bg-white text-black"
                  onChange={(e) => setValue("images", e.target.files)}
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
