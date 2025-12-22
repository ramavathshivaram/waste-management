import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, User, Clock, Trash2, PackageCheck } from "lucide-react";
import useCollectorStore from "../../stores/collectorStore.js";

const CollectorDashboard = () => {
  const collector = useCollectorStore((s) => s.collector);

  if (!collector) return null;

  // ✅ Safe fallback when stats is null
  const stats = collector.stats ?? {
    totalWasteKg: 0,
    workingMinutes: 0,
    pickups: {
      completedPickups: [],
      pendingPickups: [],
      assignedPickups: [],
    },
  };

  const hours = Math.floor((stats.workingMinutes || 0) / 60);
  const minutes = (stats.workingMinutes || 0) % 60;

  return (
    <div className="space-y-6 px-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Collector Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back 👋</p>
        </div>

        <Badge className="bg-green-100 text-green-700">
          {collector.status}
        </Badge>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <User size={18} />
            <CardTitle className="text-sm">Collector</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{collector.licenseNumber}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <MapPin size={18} />
            <CardTitle className="text-sm">Assigned Area</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {collector.area?.name ?? "Not Assigned"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Truck size={18} />
            <CardTitle className="text-sm">Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{collector.vehicle?.number ?? "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Trash2 size={18} />
            <CardTitle className="text-sm">Waste Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {stats.totalWasteKg ?? 0} kg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Clock size={18} />
            <CardTitle className="text-sm">Working Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {hours}h {minutes}m
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <PackageCheck size={18} />
            <CardTitle className="text-sm">Pickups</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>
              Assigned:{" "}
              <span className="font-medium">
                {stats.pickups.assignedPickups.length}
              </span>
            </p>
            <p>
              Pending:{" "}
              <span className="font-medium">
                {stats.pickups.pendingPickups.length}
              </span>
            </p>
            <p>
              Completed:{" "}
              <span className="font-medium">
                {stats.pickups.completedPickups.length}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectorDashboard;
