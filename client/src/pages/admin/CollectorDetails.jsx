import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminCollectorById } from "../../hooks/use-admin-query.js";
import { useApproveCollector } from "../../hooks/use-admin-mutate.js";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const CollectorDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: collector, isLoading, isError } = useAdminCollectorById(id);

  const { mutate: approveCollector, isLoading: isApproving } =
    useApproveCollector();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (isError || !collector)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load collector details
      </p>
    );

  const capacityPercent = collector.vehicle?.capacity?.max
    ? (collector.vehicle.capacity.current / collector.vehicle.capacity.max) *
      100
    : 0;

  return (
    <div className="max-w-5xl mx-auto py-10 px-5 space-y-6">
      {/* STATUS + ACTIONS */}
      <Card className="p-6 space-y-4">
        <CardHeader>
          <CardTitle>Collector Status</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Separator />

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="text-sm">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <Badge variant="outline" className="capitalize">
                  {collector.status}
                </Badge>
              </p>
              <p className="mt-1 text-gray-500">
                Completed Pickups: {collector.completedPickups ?? 0}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                disabled={collector.isApproved || isApproving}
                onClick={() =>
                  approveCollector({
                    id: collector._id,
                    isApproved: true,
                  })
                }
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>

              <Button
                variant="destructive"
                disabled={isApproving}
                onClick={() =>
                  approveCollector({
                    id: collector._id,
                    isApproved: false,
                  })
                }
              >
                Reject
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Collector Details</h2>
            <Badge
              className={
                collector.isApproved
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {collector.isApproved ? "Approved" : "Pending"}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <b>Name:</b> {collector?.userId?.name || "—"}
            </p>
            <p>
              <b>Email:</b> {collector?.userId?.email || "—"}
            </p>
            <p>
              <b>Phone:</b> {collector?.userId?.phone || "—"}
            </p>
            <p>
              <b>Address:</b> {collector?.userId?.address || "—"}
            </p>
            <p>
              <b>License:</b> {collector.licenseNumber || "—"}
            </p>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Vehicle</h2>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Capacity</span>
              <span>
                {collector.vehicle.capacity.current}/
                {collector.vehicle.capacity.max}
              </span>
            </div>
            <Progress value={capacityPercent} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CollectorDetails;
