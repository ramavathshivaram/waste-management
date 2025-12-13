import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminCollector } from "../../hooks/use-admin-query.js";

// UI components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApproveCollector } from "../../hooks/use-admin-mutate.js";

const CollectorDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: collector, isLoading, isError } = useAdminCollector(id);
  const { mutate: approveCollector, isLoading: isApproving } =
    useApproveCollector();

  if (isLoading)
    return <p className="text-center text-lg font-medium mt-10">Loading...</p>;

  if (isError)
    return (
      <p className="text-center text-lg font-medium text-red-500 mt-10">
        Failed to load collector details.
      </p>
    );

  const handleApprove = () => {
    approveCollector({ id: collector._id, isApproved: true });
  };

  const handleReject = () => {
    approveCollector({ id: collector._id, isApproved: false });
  };

  console.log(collector);

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Collector Details */}
        <Card className="p-6 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Collector Details</h2>
            <div className="flex items-center gap-4">
              <Badge
                className={`px-3 py-1 rounded-sm text-sm ${
                  collector.isApproved
                    ? "bg-green-300/20 text-green-700 border border-green-800"
                    : "bg-red-300/20 text-red-700 border border-red-800"
                }`}
              >
                {collector.isApproved ? "Approved" : "Pending"}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 ">
            <p>
              <span className="font-medium">Name:</span>
              {collector?.userId?.name || "—"}
            </p>
            <p>
              <span className="font-medium">Email:</span>
              {collector?.userId?.email || "—"}
            </p>
            <p>
              <span className="font-medium">Phone:</span>
              {collector?.userId?.phone || "—"}
            </p>
            <p>
              <span className="font-medium">Address:</span>
              {collector?.userId?.address || "—"}
            </p>
            <p>
              <span className="font-medium">license Number:</span>
              {collector?.licenseNumber || "—"}
            </p>
          </div>
        </Card>

        {/* Vehicle Image */}
        <Card className="p-6 flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl font-semibold">Vehicle</h2>

          <img
            src={
              collector?.vehicle?.image?.url ||
              "https://via.placeholder.com/150"
            }
            alt="Vehicle"
            className="w-full max-w-[300px] rounded-xl aspect-suqare  object-cover border"
          />

          <p className="text-sm">
            {collector?.vehicle?.type || "Vehicle Image"}
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6 space-y-4">
        <CardHeader>
          <CardTitle>Collector Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Separator />
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectorDetails;
