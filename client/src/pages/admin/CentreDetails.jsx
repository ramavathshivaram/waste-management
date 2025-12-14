import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminCentre } from "../../hooks/use-admin-query.js";
import { useApproveCentre } from "../../hooks/use-centre-mutate.js";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import MapCard from "../../components/common/MapCard.jsx";

const CentreDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: centre, isLoading, isError } = useAdminCentre(id);
  // const { mutate: approveCentre, isPending } = useApproveCentre();

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

  const handleApprove = () => {
    // approveCentre({ id: centre._id, isApproved: true });
  };

  const handleReject = () => {
    // approveCentre({ id: centre._id, isApproved: false });
  };

  return (
    <div className="p-2 space-y-6">
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
            {/* APPROVE / REJECT */}
            {!centre.isApproved && (
              <div className="flex gap-3">
                <Button
                  onClick={handleApprove}
                  // disabled={isPending}
                >
                  Approve Centre
                </Button>

                <Button
                  variant="destructive"
                  onClick={handleReject}
                  // disabled={isPending}
                >
                  Reject
                </Button>
              </div>
            )}

            {centre.isApproved && (
              <Badge variant="outline" className="w-fit">
                ✔ Centre Approved
              </Badge>
            )}

            <Separator />
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
                  <span className="ml-2">
                    ({capacityPercent}%)
                  </span>
                </p>
              </div>
              <Progress value={capacityPercent} />
            </div>
          </CardContent>
        </Card>

        {/* // map */}
        <MapCard
          longitude={centre.location.coordinates[0]}
          latitude={centre.location.coordinates[1]}
        />
      </div>
    </div>
  );
};

export default CentreDetails;
