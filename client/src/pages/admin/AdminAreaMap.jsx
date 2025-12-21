import React from "react";
import { useAllAreas } from "../../hooks/use-admin-query.js";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminAreas = () => {
  const { data: areas = [], isLoading } = useAllAreas();

  if (isLoading) {
    return <div className="p-4">Loading areas...</div>;
  }

  if (!areas.length) {
    return <div className="p-4 text-muted-foreground">No areas found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Filters placeholder */}
      <div className="flex gap-2">{/* filters later */}</div>

      <div className="grid-container">
        {areas.map((area) => {
          const isCollectorAssigned = !!area.collectorId;
          const isCentreAssigned = !!area.centreId;

          return (
            <Card
              key={area._id}
              className="p-4 space-y-3 hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h1 className="text-lg font-semibold">{area.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={
                    isCollectorAssigned || isCentreAssigned
                      ? "text-green-600 border-green-300"
                      : "text-red-600 border-red-300"
                  }
                >
                  {isCollectorAssigned || isCentreAssigned
                    ? "Active"
                    : "Unassigned"}
                </Badge>
              </div>

              {/* Assignment Status */}
              <div className="text-sm space-y-1">
                <p>
                  Collector:{" "}
                  <span
                    className={
                      isCollectorAssigned
                        ? "text-green-600 font-medium"
                        : "text-red-600"
                    }
                  >
                    {isCollectorAssigned ? "Assigned" : "Unassigned"}
                  </span>
                </p>

                <p>
                  Centre:{" "}
                  <span
                    className={
                      isCentreAssigned
                        ? "text-green-600 font-medium"
                        : "text-red-600"
                    }
                  >
                    {isCentreAssigned ? "Assigned" : "Unassigned"}
                  </span>
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAreas;
