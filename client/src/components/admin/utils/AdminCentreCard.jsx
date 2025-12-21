import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const getStatusClass = (status) => {
  const map = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
    busy: "bg-yellow-100 text-yellow-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-600";
};

const AdminCentreCard = ({ centre }) => {
  const navigate = useNavigate();

  const current = centre?.capacity?.current ?? 0;
  const max = centre?.capacity?.max ?? 0;

  const usagePercent =
    max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;

  const handleNavigate = () => {
    navigate(`/admin/centre?id=${centre._id}`);
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
      className="cursor-pointer rounded-2xl transition-all
                 hover:shadow-lg hover:-translate-y-1
                 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex w-full items-start justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Centre ID: {centre?._id?.slice(-6)}
          </p>

          {centre?.status && (
            <Badge className={`capitalize ${getStatusClass(centre.status)}`}>
              {centre.status}
            </Badge>
          )}
        </div>

        {/* Name */}
        <h1 className="text-xl font-semibold truncate">
          {centre?.name || "Unnamed Centre"}
        </h1>

        {/* Operating Hours */}
        <div className="flex justify-between text-sm">
          <span className="font-medium text-foreground">Operating Hours</span>
          <span className="text-muted-foreground">
            {centre?.operatingHours?.open ?? "--"} –{" "}
            {centre?.operatingHours?.close ?? "--"}
          </span>
        </div>

        {/* Capacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-foreground">Capacity Usage</span>
            <span className="text-muted-foreground">
              {current} / {max || "--"} ({usagePercent}%)
            </span>
          </div>

          <Progress value={usagePercent} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCentreCard;
