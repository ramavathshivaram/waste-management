import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminCentre } from "../../hooks/use-admin-query.js";

// ShadCN UI Components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const CentreDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, isError } = useAdminCentre(id);

  if (isLoading) return <p className="text-center text-lg mt-10">Loading...</p>;

  if (isError)
    return (
      <p className="text-center text-lg mt-10 text-red-500">
        Failed to load centre details.
      </p>
    );

  const centre = data;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold">Centre Details</h1>

      {/* Basic Info Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {centre.userId.name}

            {centre.isAdminVerified ? (
              <Badge className="bg-green-600">Verified</Badge>
            ) : (
              <Badge variant="destructive">Not Verified</Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold">Email:</p>
            <p>{centre.userId.email}</p>
          </div>

          <div>
            <p className="font-semibold">Phone:</p>
            <p>{centre.userId.phone}</p>
          </div>

          <div>
            <p className="font-semibold">Status:</p>
            <Badge
              className={
                centre.status === "active" ? "bg-green-600" : "bg-gray-500"
              }
            >
              {centre.status}
            </Badge>
          </div>

          <div>
            <p className="font-semibold">Address:</p>
            <p>{centre.userId.address}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Description:</p>
            <p>{centre.description || "No description provided"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Capacity Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Capacity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Current: <strong>{centre.capacity.current}</strong> /{" "}
            <strong>{centre.capacity.max}</strong> KG
          </p>

          <Progress
            value={(centre.capacity.current / centre.capacity.max) * 100}
            className="h-3"
          />
        </CardContent>
      </Card>

      {/* Accepted Waste Types */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Accepted Waste Types</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {centre.acceptedWasteTypes.length === 0 ? (
            <p className="text-gray-500 text-sm">No waste types added.</p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {centre.acceptedWasteTypes.map((type, i) => (
                <Badge key={i} className="bg-blue-600">
                  {type}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          {centre.location?.coordinates?.length === 2 ? (
            <p>
              <strong>Latitude:</strong> {centre.location.coordinates[1]} <br />
              <strong>Longitude:</strong> {centre.location.coordinates[0]}
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              No location coordinates provided.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CentreDetails;
