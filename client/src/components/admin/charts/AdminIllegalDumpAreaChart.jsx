import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// import { illegalDumpToAreaData } from "@/lib/illegalDumpTransform";


 const illegalDumpDailyData = [
  {
    date: "oct-01",
    illegalDumps: { resolved: 3, reported: 4, critical: 2 },
  },
  {
    date: "oct-02",
    illegalDumps: { resolved: 4, reported: 3, critical: 2 },
  },
  {
    date: "oct-03",
    illegalDumps: { resolved: 4, reported: 4, critical: 3 },
  },
  {
    date: "oct-04",
    illegalDumps: { resolved: 5, reported: 3, critical: 1 },
  },
  {
    date: "oct-05",
    illegalDumps: { resolved: 6, reported: 2, critical: 1 },
  },
  {
    date: "oct-06",
    illegalDumps: { resolved: 4, reported: 5, critical: 3 },
  },
  {
    date: "oct-07",
    illegalDumps: { resolved: 6, reported: 3, critical: 2 },
  },
  {
    date: "oct-08",
    illegalDumps: { resolved: 7, reported: 2, critical: 1 },
  },
  {
    date: "oct-09",
    illegalDumps: { resolved: 6, reported: 3, critical: 2 },
  },
  {
    date: "oct-10",
    illegalDumps: { resolved: 8, reported: 2, critical: 1 },
  },

  // WEEK 2
  {
    date: "oct-11",
    illegalDumps: { resolved: 8, reported: 2, critical: 1 },
  },
  {
    date: "oct-12",
    illegalDumps: { resolved: 9, reported: 2, critical: 1 },
  },
  {
    date: "oct-13",
    illegalDumps: { resolved: 7, reported: 4, critical: 2 },
  },
  {
    date: "oct-14",
    illegalDumps: { resolved: 9, reported: 2, critical: 1 },
  },
  {
    date: "oct-15",
    illegalDumps: { resolved: 10, reported: 1, critical: 0 },
  },

  // WEEK 3
  {
    date: "oct-16",
    illegalDumps: { resolved: 9, reported: 3, critical: 1 },
  },
  {
    date: "oct-17",
    illegalDumps: { resolved: 11, reported: 2, critical: 1 },
  },
  {
    date: "oct-18",
    illegalDumps: { resolved: 12, reported: 1, critical: 0 },
  },
  {
    date: "oct-19",
    illegalDumps: { resolved: 12, reported: 1, critical: 0 },
  },
  {
    date: "oct-20",
    illegalDumps: { resolved: 13, reported: 2, critical: 0 },
  },

  // WEEK 4
  {
    date: "oct-21",
    illegalDumps: { resolved: 14, reported: 1, critical: 0 },
  },
  {
    date: "oct-22",
    illegalDumps: { resolved: 15, reported: 1, critical: 0 },
  },
  {
    date: "oct-23",
    illegalDumps: { resolved: 15, reported: 1, critical: 0 },
  },
  {
    date: "oct-24",
    illegalDumps: { resolved: 16, reported: 0, critical: 0 },
  },
  {
    date: "oct-25",
    illegalDumps: { resolved: 17, reported: 0, critical: 0 },
  },
  {
    date: "oct-26",
    illegalDumps: { resolved: 18, reported: 0, critical: 0 },
  },
  {
    date: "oct-27",
    illegalDumps: { resolved: 18, reported: 1, critical: 0 },
  },
  {
    date: "oct-28",
    illegalDumps: { resolved: 19, reported: 0, critical: 0 },
  },
  {
    date: "oct-29",
    illegalDumps: { resolved: 20, reported: 0, critical: 0 },
  },
  {
    date: "oct-30",
    illegalDumps: { resolved: 22, reported: 0, critical: 0 },
  },
];

const AdminIllegalDumpAreaChart = () => {
  const data = illegalDumpToAreaData(illegalDumpDailyData);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <CartesianGrid opacity={0.05} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />

        <defs>
          <linearGradient id="dumpResolved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
          </linearGradient>

          <linearGradient id="dumpReported" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.1} />
          </linearGradient>

          <linearGradient id="dumpCritical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="resolved"
          stroke="#22c55e"
          fill="url(#dumpResolved)"
        />

        <Area
          type="monotone"
          dataKey="reported"
          stroke="#f59e0b"
          fill="url(#dumpReported)"
        />

        <Area
          type="monotone"
          dataKey="critical"
          stroke="#ef4444"
          fill="url(#dumpCritical)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AdminIllegalDumpAreaChart;


const illegalDumpToAreaData = (dailyStats = []) => {
  return dailyStats.map((day) => ({
    date: day.date,

    // Positive
    resolved: day.illegalDumps.resolved,

    // Mild negative
    reported: -day.illegalDumps.reported * 0.6,

    // Strong negative
    critical: -day.illegalDumps.critical * 1.2,
  }));
};
