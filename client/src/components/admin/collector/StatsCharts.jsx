import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PackageCheck } from "lucide-react";


const StatsCharts = ({dummyStats}) => {
   
   const pickupChartData = [
     {
       name: "Completed",
       value: dummyStats.pickups.completedPickups.length,
       color: "#22c55e", // green
     },
     {
       name: "Pending",
       value: dummyStats.pickups.pendingPickups.length,
       color: "#facc15", // yellow
     },
     {
       name: "Assigned",
       value: dummyStats.pickups.assinedPickups.length,
       color: "#3b82f6", // blue
     },
   ];
   
   const totalPickups = pickupChartData.reduce((sum, item) => sum + item.value, 0);
   
  return (
   <Card className="col-span-3">
  <CardHeader className="flex flex-row items-center gap-2">
    <PackageCheck size={18} />
    <CardTitle className="text-sm">Pickups</CardTitle>
  </CardHeader>

  <CardContent className="h-[220px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pickupChartData}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
        >
          {pickupChartData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>

        {/* Center text */}
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan
            x="50%"
            dy="-4"
            className="text-lg font-semibold fill-foreground"
          >
            {totalPickups}
          </tspan>
          <tspan x="50%" dy="16" className="text-xs fill-muted-foreground">
            Total
          </tspan>
        </text>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
  )
}

export default StatsCharts
