import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Building2, Edit } from "lucide-react";
import { useAreaById } from "../../hooks/use-area-query.js";

const AreaDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useAreaById(id);

  if (isLoading) {
    return <p className="text-muted-foreground">Loading area details...</p>;
  }

  if (!data) {
    return <p className="text-red-500">Area not found</p>;
  }

  const coordinatesCount = data.area?.coordinates?.[0]?.length || 0;

  return (
    <div className="space-y-6 px-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          <p className="text-sm text-muted-foreground">
            {data.description || "No description provided"}
          </p>
        </div>

        <Button
          onClick={() => navigate(`/admin/area/update?id=${id}`)}
          className="flex gap-2"
        >
          <Edit size={16} />
          Update Area
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <User size={18} />
            <CardTitle className="text-sm">Collector</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant="outline"
              className={
                data.collectorId
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {data.collectorId ? "Assigned" : "Not Assigned"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Building2 size={18} />
            <CardTitle className="text-sm">Centre</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant="outline"
              className={
                data.centreId
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {data.centreId ? "Assigned" : "Not Assigned"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <MapPin size={18} />
            <CardTitle className="text-sm">Polygon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">
              {coordinatesCount} Boundary Points
            </p>
            <p className="text-xs text-muted-foreground">GeoJSON Polygon</p>
          </CardContent>
        </Card>
      </div>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Metadata</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Area ID</span>
            <span className="font-mono">{data._id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Created At</span>
            <span>{new Date(data.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated</span>
            <span>{new Date(data.updatedAt).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AreaDetails;
