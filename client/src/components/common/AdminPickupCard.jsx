import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, scale, transform } from "motion/react";
import { MapPin, Package, Recycle } from "lucide-react";

const AdminPickupCard = ({ pickup }) => {
  if (!pickup) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        duration: 0.2,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <Card className="rounded-2xl border hover:shadow-xl transition-all duration-300">
        {/* HEADER */}
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Recycle className="w-5 h-5 text-green-600" />
            <CardTitle className="capitalize text-lg">
              {pickup.wasteType}
            </CardTitle>
          </div>

          <Badge
            className={
              pickup.isCompleted ? "bg-green-600" : "bg-yellow-500 text-black"
            }
          >
            {pickup.isCompleted ? "Completed" : "Pending"}
          </Badge>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-4 text-sm">
          {/* Quantity + Mode */}
          <div className="flex justify-between text-gray-700">
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4 text-gray-500" />
              <span>Qty:</span>
              <span className="font-medium">{pickup.quantity}</span>
            </div>

            <Badge variant="outline" className="capitalize">
              {pickup.mode}
            </Badge>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Pickup Status</span>
            <Badge
              className={
                pickup.status === "assigned"
                  ? "bg-blue-600"
                  : pickup.status === "cancelled"
                  ? "bg-red-600"
                  : "bg-gray-600"
              }
            >
              {pickup.status}
            </Badge>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
            <p className="line-clamp-2">
              {pickup.address || "No address provided"}
            </p>
          </div>

          {/* Description */}
          {pickup.desc && (
            <p className="text-xs text-gray-400 italic line-clamp-2">
              “{pickup.desc}”
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminPickupCard;
