import React from "react";
import useUserAllPickupRequests from "../../hooks/useUserAllPickupRequests.js";
import useUserAllIllegalDumps from "../../hooks/useUserAllIllegalDumps.js";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data, isLoading, error } = useUserAllPickupRequests();
  const { data: illegalDumpData, isLoading: dumpLoading } =
    useUserAllIllegalDumps();

  const pickupRequests = data?.data || [];
  const illegalDumps = illegalDumpData?.data || [];

  if (isLoading || dumpLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500">Failed to load dashboard data</p>
    );

  const badgeTheme = {
    pending: "border border-black text-black bg-white",
    accepted: "bg-black text-white border border-black",
    assigned: "bg-white text-black border border-black",
    "in-progress": "bg-black text-white",
    completed: "bg-white text-black border border-black",
    rejected: "bg-black text-white border border-black line-through",
    new: "bg-white border border-black text-black",
    "in-review": "bg-black text-white",
    resolved: "bg-white border border-black text-black",
  };

  const getStatusColor = (status) =>
    badgeTheme[status] || "border border-black text-black";

  return (
    <div className="min-h-screen bg-white text-black p-6 space-y-12">
      {/* PICKUP REQUEST SECTION */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Your Pickup Requests</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pickupRequests.map((req) => (
            <Card
              key={req._id}
              className="border border-black rounded-xl bg-white text-black shadow-sm hover:shadow-md transition"
            >
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{req.wasteType.toUpperCase()}</span>
                  <Badge className={getStatusColor(req.status)}>
                    {req.status}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p>
                  <strong>Quantity:</strong> {req.quantity}
                </p>
                <p>
                  <strong>Address:</strong> {req.address}
                </p>
                <p>
                  <strong>Scheduled:</strong>{" "}
                  {new Date(req.scheduledDateTime).toLocaleString()}
                </p>

                {req.images?.length > 0 && (
                  <img
                    src={req.images[0].url}
                    alt="pickup"
                    className="rounded-md border border-black max-h-40 object-cover"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ILLEGAL DUMP REPORT SECTION */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Your Illegal Dump Reports</h1>

        {illegalDumps.length === 0 ? (
          <p className="text-gray-700">
            You have not reported any illegal dumping yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {illegalDumps.map((dump) => (
              <Card
                key={dump._id}
                className="border border-black rounded-xl bg-white text-black shadow-sm hover:shadow-md transition"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{dump.locationText || "Unknown Location"}</span>
                    <Badge className={getStatusColor(dump.status)}>
                      {dump.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p>
                    <strong>Address:</strong> {dump.address}
                  </p>
                  <p>
                    <strong>Description:</strong> {dump.description}
                  </p>
                  <p>
                    <strong>Severity:</strong> {dump.severity}
                  </p>

                  {dump.images?.length > 0 && (
                    <img
                      src={dump.images[0].url}
                      alt="illegal dump"
                      className="rounded-md border border-black max-h-40 object-cover"
                    />
                  )}

                  <p className="text-xs text-gray-600">
                    Reported: {new Date(dump.createdAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
