import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, Flame, Calendar } from "lucide-react";

const ReportCard = ({ dump }) => {
  const statusTheme = {
    new: "bg-white border border-black text-black",
    pending: "border border-black bg-white text-black",
    accepted: "bg-black text-white",
    assigned: "bg-white text-black border border-black",
    "in-progress": "bg-black text-white",
    completed: "bg-green-600 text-white",
    rejected: "bg-red-600 text-white line-through",
    "in-review": "bg-gray-800 text-white",
    resolved: "bg-green-600 text-white",
  };

  const priorityTheme = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <Card
      className="border border-black rounded-2xl
      shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* HEADER */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold tracking-wide truncate">
            {dump.address || "Unknown Location"}
          </CardTitle>

          <Badge
            className={`${
              statusTheme[dump.status]
            } capitalize px-3 py-1 shrink-0`}
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
              alt="Illegal dump"
              className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <CardContent className="space-y-3 text-sm mt-2">
        {/* ADDRESS */}
        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-1 shrink-0" />
          <p className="line-clamp-2">
            <strong>Address:</strong> {dump.address}
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="flex items-start gap-2">
          <Info size={16} className="mt-1 shrink-0" />
          <p className="line-clamp-2">
            <strong>Description:</strong> {dump.description}
          </p>
        </div>

        {/* PRIORITY */}
        <div className="flex items-center gap-2">
          <Flame size={16} />
          <Badge className={priorityTheme[dump.priority]}>
            {dump.priority}
          </Badge>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-2  p-2 rounded-lg border">
          <Calendar size={16} />
          <span className="text-sm font-medium">
            Reported: {new Date(dump.createdAt).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
