import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminCollector } from "../../hooks/use-admin-query.js";

// UI components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApproveCollector } from "../../hooks/use-admin-mutate.js";
import { toast } from "sonner";

const CollectorDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, isError } = useAdminCollector(id);
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

  const collector = data;

  const handleApprove = () => {
    approveCollector({ id: collector._id, isApproved: true });
  };

  const handleReject = () => {
    approveCollector({ id: collector._id, isApproved: false });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Collector Details</h1>

        {/* Approval Buttons */}
        <div className="flex gap-3">
          {!collector.isAdminVerified ? (
            <>
              <Button
                disabled={isApproving}
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                {isApproving ? "Approving..." : "Approve"}
              </Button>

              <Button
                disabled={isApproving}
                onClick={handleReject}
                className="bg-red-600 hover:bg-red-700"
              >
                {isApproving ? "Rejecting..." : "Reject"}
              </Button>
            </>
          ) : (
            <Badge className="bg-green-600 text-white text-sm px-4 py-1">
              {collector.isApproved ? "Verified" : "Rejected"}
            </Badge>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3 text-2xl">
              {collector.userId.name}

              {collector.isAdminVerified ? (
                <Badge className="bg-green-700">Verified</Badge>
              ) : (
                <Badge variant="destructive">Not Verified</Badge>
              )}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold">Email:</p>
            <p>{collector.userId.email}</p>
          </div>

          <div>
            <p className="font-semibold">Phone:</p>
            <p>{collector.userId.phone}</p>
          </div>

          <div>
            <p className="font-semibold">Status:</p>
            <Badge
              className={
                collector.status === "active" ? "bg-green-600" : "bg-gray-500"
              }
            >
              {collector.status}
            </Badge>
          </div>

          <div>
            <p className="font-semibold">License Number:</p>
            <p>{collector.licenseNumber}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Address:</p>
            <p>{collector.userId.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Info */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">Vehicle Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold">Type:</p>
              <p>{collector.vehicle.type}</p>
            </div>

            <div>
              <p className="font-semibold">Vehicle Number:</p>
              <p>{collector.vehicle.number}</p>
            </div>

            <div>
              <p className="font-semibold">Capacity:</p>
              <p>
                {collector.vehicle.capacity.current} /{" "}
                {collector.vehicle.capacity.max} KG
              </p>
            </div>
          </div>

          <Separator />

          <img
            src={collector.vehicle.image?.url}
            alt="Vehicle"
            className="w-full max-w-sm rounded-md shadow-md border"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectorDetails;
