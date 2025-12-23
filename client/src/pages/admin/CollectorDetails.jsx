import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminCollectorById } from "../../hooks/use-admin-query.js";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Approve from "../../components/admin/utils/Approve";
import CollectorStatsContainer from "../../components/admin/collector/CollectorStatsContainer.jsx";
import LiveLocationMap from "../../components/admin/collector/LiveLocationMap.jsx";

const CollectorDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: collector, isLoading, isError } = useAdminCollectorById(id);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (isError || !collector)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load collector details
      </p>
    );

  console.log(collector);

  return (
    <div className="max-w-5xl mx-auto py-5 px-4 space-y-6">
      {/* STATUS + ACTIONS */}
      <Approve
        label="collector"
        id={collector._id}
        area={collector.area}
        currentstatus={collector.status}
      />

      {/* DETAILS */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6 col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Collector Details</h2>
            <Badge
              className={
                collector.status == "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {collector.status == "active" ? "Approved" : "Pending"}
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

       <LiveLocationMap />
      </div>
      <CollectorStatsContainer id={collector._id} />
    </div>
  );
};

export default CollectorDetails;
