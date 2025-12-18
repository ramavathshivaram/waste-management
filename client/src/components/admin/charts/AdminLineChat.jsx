import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import dashboardToLineData from "@/lib/dashboardToLineData.js";
import { CHART_COLORS } from "@/lib/colors.js";

const dashboardData = {
  dailyStats: [
    {
      date: "2025-09-01",
      pickups: { completed: 32, pending: 8 },
      centres: { active: 5 },
      collectors: { active: 14 },
      illegalDumps: { total: 6 },
    },
    {
      date: "2025-09-02",
      pickups: { completed: 40, pending: 5 },
      centres: { active: 6 },
      collectors: { active: 15 },
      illegalDumps: { total: 4 },
    },
    {
      date: "2025-09-03",
      pickups: { completed: 38, pending: 7 },
      centres: { active: 6 },
      collectors: { active: 15 },
      illegalDumps: { total: 5 },
    },
    {
      date: "2025-09-04",
      pickups: { completed: 45, pending: 6 },
      centres: { active: 6 },
      collectors: { active: 16 },
      illegalDumps: { total: 3 },
    },
    {
      date: "2025-09-05",
      pickups: { completed: 48, pending: 4 },
      centres: { active: 6 },
      collectors: { active: 16 },
      illegalDumps: { total: 2 },
    },
    {
      date: "2025-09-06",
      pickups: { completed: 42, pending: 9 },
      centres: { active: 5 },
      collectors: { active: 15 },
      illegalDumps: { total: 6 },
    },
    {
      date: "2025-09-07",
      pickups: { completed: 50, pending: 5 },
      centres: { active: 6 },
      collectors: { active: 17 },
      illegalDumps: { total: 4 },
    },
    {
      date: "2025-09-08",
      pickups: { completed: 55, pending: 6 },
      centres: { active: 6 },
      collectors: { active: 17 },
      illegalDumps: { total: 3 },
    },
    {
      date: "2025-09-09",
      pickups: { completed: 53, pending: 7 },
      centres: { active: 6 },
      collectors: { active: 16 },
      illegalDumps: { total: 4 },
    },
    {
      date: "2025-09-10",
      pickups: { completed: 58, pending: 4 },
      centres: { active: 6 },
      collectors: { active: 18 },
      illegalDumps: { total: 2 },
    },

    // WEEK 3
    {
      date: "2025-09-11",
      pickups: { completed: 60, pending: 6 },
      centres: { active: 6 },
      collectors: { active: 18 },
      illegalDumps: { total: 3 },
    },
    {
      date: "2025-09-12",
      pickups: { completed: 62, pending: 5 },
      centres: { active: 6 },
      collectors: { active: 18 },
      illegalDumps: { total: 2 },
    },
    {
      date: "2025-09-13",
      pickups: { completed: 59, pending: 8 },
      centres: { active: 5 },
      collectors: { active: 17 },
      illegalDumps: { total: 5 },
    },
    {
      date: "2025-09-14",
      pickups: { completed: 65, pending: 4 },
      centres: { active: 6 },
      collectors: { active: 19 },
      illegalDumps: { total: 3 },
    },
    {
      date: "2025-09-15",
      pickups: { completed: 68, pending: 3 },
      centres: { active: 6 },
      collectors: { active: 19 },
      illegalDumps: { total: 2 },
    },

    // WEEK 4
    {
      date: "2025-09-16",
      pickups: { completed: 66, pending: 6 },
      centres: { active: 6 },
      collectors: { active: 18 },
      illegalDumps: { total: 4 },
    },
    {
      date: "2025-09-17",
      pickups: { completed: 70, pending: 5 },
      centres: { active: 6 },
      collectors: { active: 20 },
      illegalDumps: { total: 3 },
    },
    {
      date: "2025-09-18",
      pickups: { completed: 72, pending: 4 },
      centres: { active: 6 },
      collectors: { active: 20 },
      illegalDumps: { total: 2 },
    },
    {
      date: "2025-09-19",
      pickups: { completed: 75, pending: 3 },
      centres: { active: 6 },
      collectors: { active: 21 },
      illegalDumps: { total: 1 },
    },
    {
      date: "2025-09-20",
      pickups: { completed: 73, pending: 6 },
      centres: { active: 6 },
      collectors: { active: 21 },
      illegalDumps: { total: 2 },
    },

    // LAST DAYS
    {
      date: "2025-09-21",
      pickups: { completed: 78, pending: 4 },
      centres: { active: 6 },
      collectors: { active: 22 },
      illegalDumps: { total: 2 },
    },
    {
      date: "2025-09-22",
      pickups: { completed: 80, pending: 3 },
      centres: { active: 6 },
      collectors: { active: 22 },
      illegalDumps: { total: 1 },
    },
    {
      date: "2025-09-23",
      pickups: { completed: 82, pending: 4 },
      centres: { active: 6 },
      collectors: { active: 23 },
      illegalDumps: { total: 1 },
    },
    {
      date: "2025-09-24",
      pickups: { completed: 85, pending: 3 },
      centres: { active: 6 },
      collectors: { active: 23 },
      illegalDumps: { total: 1 },
    },
    {
      date: "2025-09-25",
      pickups: { completed: 88, pending: 2 },
      centres: { active: 6 },
      collectors: { active: 24 },
      illegalDumps: { total: 0 },
    },
    {
      date: "2025-09-26",
      pickups: { completed: 90, pending: 2 },
      centres: { active: 6 },
      collectors: { active: 24 },
      illegalDumps: { total: 0 },
    },
    {
      date: "2025-09-27",
      pickups: { completed: 92, pending: 3 },
      centres: { active: 6 },
      collectors: { active: 25 },
      illegalDumps: { total: 1 },
    },
    {
      date: "2025-09-28",
      pickups: { completed: 95, pending: 2 },
      centres: { active: 6 },
      collectors: { active: 25 },
      illegalDumps: { total: 0 },
    },
    {
      date: "2025-09-29",
      pickups: { completed: 97, pending: 1 },
      centres: { active: 6 },
      collectors: { active: 26 },
      illegalDumps: { total: 0 },
    },
    {
      date: "2025-09-30",
      pickups: { completed: 100, pending: 1 },
      centres: { active: 6 },
      collectors: { active: 26 },
      illegalDumps: { total: 0 },
    },
  ],
};

const AdminLineChat = () => {
  const lineData = dashboardToLineData(dashboardData?.dailyStats);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={lineData}>
        <CartesianGrid opacity={0.05} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          dot={false}
          activeDot={false}
          type="monotone"
          dataKey="pickups"
          stroke={CHART_COLORS.pickups}
          strokeWidth={1}
        />

        <Line
          dot={false}
          activeDot={false}
          type="monotone"
          dataKey="collectors"
          stroke={CHART_COLORS.collectors}
          strokeWidth={1}
        />

        <Line
          dot={false}
          activeDot={false}
          type="monotone"
          dataKey="centres"
          stroke={CHART_COLORS.centres}
          strokeWidth={1}
        />

        <Line
          dot={false}
          activeDot={false}
          type="monotone"
          dataKey="illegalDumps"
          stroke={CHART_COLORS.illegalDumps}
          strokeWidth={1}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AdminLineChat;
