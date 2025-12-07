import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, Flame, Calendar } from "lucide-react";

const ReportCard = ({ dump }) => {
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
      key={dump._id}
      className="border border-black rounded-2xl bg-white text-black 
      shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* HEADER */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold tracking-wide truncate max-w-[200px]">
            {dump.locationText || "Unknown Location"}
          </CardTitle>

          <Badge
            className={`${getStatusColor(dump.status)} capitalize px-3 py-1`}
          >
            {dump.status}
          </Badge>
        </div>
      </CardHeader>

      {/* IMAGE */}
      {dump.images?.length > 0 && (
        <div className="w-full px-4">
          <div className="overflow-hidden rounded-md border border-black shadow">
            <img
              src={dump.images[0].url}
              alt="illegal dump"
              className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <CardContent className="space-y-3 text-sm mt-2">
        {/* ADDRESS */}
        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-1" />
          <p className="truncate max-w-[250px]">
            <strong>Address:</strong> {dump.address}
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="flex items-start gap-2">
          <Info size={16} className="mt-1" />
          <p className="truncate max-w-[250px]">
            <strong>Description:</strong> {dump.description}
          </p>
        </div>

        {/* SEVERITY */}
        <div className="flex items-center gap-2">
          <Flame size={16} />
          <p>
            <strong>Severity:</strong> {dump.severity}
          </p>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-black">
          <Calendar size={16} className="text-black" />
          <span className="text-sm font-medium">
            Reported: {new Date(dump.createdAt).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
