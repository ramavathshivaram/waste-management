import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminCentre } from "../../hooks/use-admin-query.js";

// shadcn/ui
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const CentreDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, isError } = useAdminCentre(id);

  if (isLoading) return <p>Loading centre details...</p>;
  if (isError || !data) return <p>Failed to load centre</p>;

  const capacityPercent = Math.round(
    (data.capacity.current / data.capacity.max) * 100
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{data.name}</CardTitle>

          <Badge
            variant={
              data.status === "active"
                ? "default"
                : data.status === "full"
                ? "destructive"
                : "secondary"
            }
          >
            {data.status}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{data.description}</p>

          <Separator />

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Address:</span>
              <p>{data.address}</p>
            </div>

            <div>
              <span className="font-medium">Phone:</span>
              <p>{data.phone}</p>
            </div>

            <div>
              <span className="font-medium">Operating Hours:</span>
              <p>
                {data.operatingHours.open} – {data.operatingHours.close}
              </p>
            </div>

            <div>
              <span className="font-medium">Admin Verified:</span>
              <p>{data.isAdminVerified ? "Yes" : "No"}</p>
            </div>
          </div>

          <Separator />

          {/* Accepted Waste Types */}
          <div>
            <h4 className="font-medium mb-2">Accepted Waste Types</h4>
            <div className="flex flex-wrap gap-2">
              {data.acceptedWasteTypes.map((type) => (
                <Badge key={type} variant="outline" className="capitalize">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Capacity */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Capacity Usage</span>
              <span>
                {data.capacity.current} / {data.capacity.max} kg
              </span>
            </div>

            <Progress value={capacityPercent} />
            <p className="text-xs text-muted-foreground">
              {capacityPercent}% used
            </p>
          </div>

          <Separator />

          {/* Location */}
          <div className="text-sm">
            <span className="font-medium">Location (Lat, Lng):</span>
            <p>
              {data.location.coordinates[1]}, {data.location.coordinates[0]}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CentreDetails;
