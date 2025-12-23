import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Route,
  Clock,
  PackageCheck,
  CheckCircle,
  Package,
} from "lucide-react";
import StatsCharts from "./StatsCharts";
import { useCollectorStatsByDate } from "../../../hooks/use-admin-query.js";
import { dataTagSymbol } from "@tanstack/react-query";

const startOfDay = (daysAgo = 0) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d;
};

const CollectorStatsContainer = ({ id }) => {
  const [currentDate, setCurrentDate] = useState(startOfDay());

  const { data, isLoading } = useCollectorStatsByDate({
    date: currentDate,
    collectorId: id,
  });

  if (isLoading) return <p>Loading...</p>;

  const workingMinutes = data?.workingMinutes ?? 0;
  const hours = Math.floor(workingMinutes / 60);
  const minutes = workingMinutes % 60;

  return (
    <div className="space-y-6 p-2 border rounded-2xl border-border">
      {/* Date Nav */}
      <div className="flex items-center justify-center gap-4">
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            setCurrentDate((d) => new Date(d.setDate(d.getDate() - 1)))
          }
        >
          <ChevronLeft />
        </Button>

        <p className="font-medium text-sm">{currentDate.toDateString()}</p>

        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            setCurrentDate((d) => new Date(d.setDate(d.getDate() + 1)))
          }
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Trash2 size={18} />
            <CardTitle className="text-sm">Waste Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {data?.totalWasteKg ?? 0} kg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Route size={18} />
            <CardTitle className="text-sm">Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {data?.totalDistanceKm ?? 0} km
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

        <StatsCharts stats={data.totals} />
      </div>
    </div>
  );
};

export default CollectorStatsContainer;
