import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Calendar } from "lucide-react";

const PickupRequestCard = ({ req }) => {
  const badgeTheme = {
    pending: "bg-yellow-400/30 text-yellow-800 border border-yellow-500",
    accepted: "bg-black text-white",
    assigned: "bg-white text-black border border-black",
    "in-progress": "bg-blue-600 text-white",
    completed: "bg-green-600 text-white",
    rejected: "bg-red-600 text-white line-through",
  };

  const badgeClass = badgeTheme[req.status] || "border border-black text-black";

  const createdDate = new Date(req.createdAt).toLocaleString();

  const [lng, lat] = req.location?.coordinates || [];

  return (
    <Card className="border rounded-2xl shadow-sm hover:shadow-md transition-all">
      {/* HEADER */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">
            {req.area?.name || "Unknown Area"}
          </CardTitle>

          <Badge className={`${badgeClass} capitalize`}>{req.status}</Badge>
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-3 text-sm">
        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5" />
          <p className="line-clamp-2">
            <strong>Address:</strong> {req.address}
          </p>
        </div>

        {/* Mode */}
        <div className="flex items-center gap-2">
          <Package size={16} />
          <p>
            <strong>Mode:</strong>{" "}
            <span className="capitalize">{req.mode}</span>
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <p>
            <strong>Requested:</strong> {createdDate}
          </p>
        </div>

        {/* Coordinates (optional, admin/debug view) */}
        {lng && lat && (
          <p className="text-xs text-muted-foreground">
            📍 {lat.toFixed(5)}, {lng.toFixed(5)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PickupRequestCard;
