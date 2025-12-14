import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, ShieldCheck, ShieldX, Truck, Activity } from "lucide-react";

const CollectorCard = ({ collector }) => {
  const navigate = useNavigate();
  if (!collector) return null;

  const { licenseNumber, isAdminVerified, status, completedPickups, vehicle } =
    collector;

  return (
    <Card
      onClick={() => navigate(`/admin/collector?id=${collector._id}`)}
      className="rounded-2xl border hover:shadow-lg transition-all"
    >
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-lg">Collector</h3>
        </div>

        {isAdminVerified ? (
          <Badge className="bg-green-600 flex gap-1">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </Badge>
        ) : (
          <Badge className="bg-red-600 flex gap-1">
            <ShieldX className="w-3 h-3" />
            Not Verified
          </Badge>
        )}
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-4 text-sm">
        {/* License */}
        <div className="flex justify-between">
          <span className="text-gray-500">License</span>
          <span className="font-medium">{licenseNumber || "Not Provided"}</span>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Status</span>
          <Badge
            className={
              status === "active"
                ? "bg-green-600"
                : status === "busy"
                ? "bg-yellow-500 text-black"
                : "bg-gray-600"
            }
          >
            <Activity className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        </div>

        {/* Completed Pickups */}
        <div className="flex justify-between">
          <span className="text-gray-500">Completed</span>
          <span className="font-semibold">{completedPickups}</span>
        </div>

        {/* Vehicle Capacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Vehicle Capacity
            </span>
            <span>
              {vehicle.capacity.current}/{vehicle.capacity.max}
            </span>
          </div>

          <Progress
            value={(vehicle.capacity.current / vehicle.capacity.max) * 100}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectorCard;
