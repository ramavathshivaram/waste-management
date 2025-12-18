import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import { dashboardToRadarData } from "@/lib/radarTransform.js";

const AdminRadarChart = () => {
  const dashboardData = {
    pickups: {
      total: 120,
      pending: 34,
      completed: 86,
      delayed: 12,
    },
    centres: {
      total: 6,
      active: 5,
      inactive: 1,
      avgCapacityUsage: 72,
    },
    collectors: {
      total: 18,
      active: 14,
      inactive: 4,
      avgEfficiency: 80,
    },
    illegalDumps: {
      total: 22,
      high: 6,
      medium: 10,
      low: 6,
    },
  };

  const radarData = dashboardToRadarData(dashboardData);

  return (
      <ResponsiveContainer width="100%" height={"100%"}>
        <RadarChart data={radarData}>
          <PolarGrid opacity={0.3} />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis domain={[0, 100]} />

          <Radar
            name="System Health"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
  );
};

export default AdminRadarChart;
