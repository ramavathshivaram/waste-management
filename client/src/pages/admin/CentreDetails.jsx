import React from "react";
import { useSearchParams } from "react-router-dom";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import MapCard from "../../components/common/MapCard.jsx";
import AdminCentreDailyStats from "../../components/admin/centre/AdminCentreDailyStats.jsx";
import Approve from "../../components/admin/utils/Approve";
import { useAdminCentreById } from "../../hooks/use-admin-query.js";

const CentreDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: centre, isLoading, isError } = useAdminCentreById(id);

  if (isLoading) return <p className="p-6">Loading centre details...</p>;
  if (isError || !centre) return <p className="p-6">Failed to load centre</p>;

  const current = centre.capacity?.current ?? 0;
  const max = centre.capacity?.max ?? 0;
  const capacityPercent = max > 0 ? Math.round((current / max) * 100) : 0;

  const statusVariant =
    {
      active: "default",
      inactive: "secondary",
      busy: "outline",
    }[centre.status] || "secondary";

  console.log(centre);

  return (
    <div className="p-2 space-y-6">
      <Approve
        id={centre._id}
        area={centre.area}
        label="centre"
        currentstatus={centre.status}
      />

      <div className="grid grid-cols-3 gap-1">
        <Card className="col-span-2">
          {/* HEADER */}
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">{centre.name}</CardTitle>
            <Badge variant={statusVariant} className="capitalize">
              {centre.status}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {centre.userId?.email ?? "--"}
              </p>

              <p>
                <span className="font-medium">Operating Hours:</span>{" "}
                {centre.operatingHours?.open ?? "--"} –{" "}
                {centre.operatingHours?.close ?? "--"}
              </p>
            </div>

            <Separator />
            {/* CAPACITY */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Capacity Usage</span>
                <p>
                  {current} / {max}
                  <span className="ml-2">({capacityPercent}%)</span>
                </p>
              </div>
              <Progress value={capacityPercent} />
            </div>
          </CardContent>
        </Card>

        {/* // map */}
        <MapCard
          locationName={centre?.area?.name}
          longitude={centre.location.coordinates[0]}
          latitude={centre.location.coordinates[1]}
        />
      </div>

      <AdminCentreDailyStats id={id} />
    </div>
  );
};

export default CentreDetails;
