import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Calendar } from "lucide-react";

const PickupRequestCard = ({ req }) => {
  const badgeTheme = {
    pending: "border border-black bg-white text-black",
    accepted: "bg-black text-white",
    assigned: "bg-white text-black border border-black",
    "in-progress": "bg-black text-white",
    completed: "bg-green-600 text-white",
    rejected: "bg-red-600 text-white line-through",
    new: "bg-white border border-black text-black",
    "in-review": "bg-gray-800 text-white",
    resolved: "bg-green-600 text-white",
  };

  const getStatusColor = (status) =>
    badgeTheme[status] || "border border-black text-black";

  return (
    <Card
      className="border border-black rounded-2xl bg-white text-black 
      shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* HEADER */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold tracking-wide">
            {req.wasteType.toUpperCase()}
          </CardTitle>

          <Badge
            className={`${getStatusColor(req.status)} capitalize px-3 py-1`}
          >
            {req.status}
          </Badge>
        </div>
      </CardHeader>

      {/* IMAGE */}
      {req.images?.length > 0 && (
        <div className="w-full px-5">
          <div className="overflow-hidden rounded-md border border-black shadow">
            <img
              src={req.images[0].url}
              alt="pickup"
              className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <CardContent className="space-y-3 text-sm">
        {/* QUANTITY */}
        <div className="flex items-center gap-2">
          <Package size={16} />
          <p>
            <strong>Quantity:</strong> {req.quantity}
          </p>
        </div>

        {/* ADDRESS */}
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <p className="truncate max-w-[240px]">
            <strong>Address:</strong> {req.address}
          </p>
        </div>

        {/* SCHEDULED DATE */}
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-black">
          <Calendar size={16} className="text-black" />
          <span className="text-sm font-medium">
            {new Date(req.scheduledDateTime).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PickupRequestCard;
