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

const startOfDay = (daysAgo = 0) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d;
};

const dummyStats = {
  collectorId: null,
  date: startOfDay(2),
  totalWasteKg: 165,
  totalDistanceKm: 30.2,
  workingMinutes: 385,
  pickups: {
    completedPickups: ["1", "2"],
    pendingPickups: ["3"],
    assinedPickups: ["4"],
  },
};

const CollectorStatsContainer = ({id}) => {
  const [currentDate, setCurrentDate] = useState(dummyStats.date);

  const handlePrev = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const hours = Math.floor(dummyStats.workingMinutes / 60);
  const minutes = dummyStats.workingMinutes % 60;

  return (
    <div className="space-y-6 p-2 border rounded-2xl border-border ">
      {/* Date Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button size="icon" variant="outline" onClick={handlePrev}>
          <ChevronLeft />
        </Button>

        <p className="font-medium text-sm">{currentDate.toDateString()}</p>

        <Button size="icon" variant="outline" onClick={handleNext}>
          <ChevronRight />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Waste */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Trash2 size={18} />
            <CardTitle className="text-sm">Waste Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {dummyStats.totalWasteKg} kg
            </p>
          </CardContent>
        </Card>

        {/* Distance */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Route size={18} />
            <CardTitle className="text-sm">Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {dummyStats.totalDistanceKm} km
            </p>
          </CardContent>
        </Card>

        {/* Working Time */}
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

        <StatsCharts dummyStats={dummyStats} />
      </div>
    </div>
  );
};

export default CollectorStatsContainer;
