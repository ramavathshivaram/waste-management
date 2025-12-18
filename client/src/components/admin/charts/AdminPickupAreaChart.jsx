import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const pickupDailyData = [
  {
    date: "2025-09-01",
    pickups: { completed: 32, pending: 8, arise: 4 },
  },
  {
    date: "2025-09-02",
    pickups: { completed: 38, pending: 6, arise: 3 },
  },
  {
    date: "2025-09-03",
    pickups: { completed: 36, pending: 7, arise: 4 },
  },
  {
    date: "2025-09-04",
    pickups: { completed: 42, pending: 5, arise: 2 },
  },
  {
    date: "2025-09-05",
    pickups: { completed: 45, pending: 4, arise: 2 },
  },
  {
    date: "2025-09-06",
    pickups: { completed: 40, pending: 9, arise: 5 },
  },
  {
    date: "2025-09-07",
    pickups: { completed: 48, pending: 6, arise: 3 },
  },
  {
    date: "2025-09-08",
    pickups: { completed: 52, pending: 5, arise: 2 },
  },
  {
    date: "2025-09-09",
    pickups: { completed: 50, pending: 6, arise: 3 },
  },
  {
    date: "2025-09-10",
    pickups: { completed: 55, pending: 4, arise: 1 },
  },

  // WEEK 2
  {
    date: "2025-09-11",
    pickups: { completed: 58, pending: 5, arise: 2 },
  },
  {
    date: "2025-09-12",
    pickups: { completed: 60, pending: 4, arise: 1 },
  },
  {
    date: "2025-09-13",
    pickups: { completed: 56, pending: 7, arise: 4 },
  },
  {
    date: "2025-09-14",
    pickups: { completed: 62, pending: 4, arise: 2 },
  },
  {
    date: "2025-09-15",
    pickups: { completed: 65, pending: 3, arise: 1 },
  },

  // WEEK 3
  {
    date: "2025-09-16",
    pickups: { completed: 63, pending: 6, arise: 3 },
  },
  {
    date: "2025-09-17",
    pickups: { completed: 68, pending: 4, arise: 2 },
  },
  {
    date: "2025-09-18",
    pickups: { completed: 70, pending: 3, arise: 1 },
  },
  {
    date: "2025-09-19",
    pickups: { completed: 72, pending: 3, arise: 1 },
  },
  {
    date: "2025-09-20",
    pickups: { completed: 74, pending: 4, arise: 2 },
  },

  // WEEK 4
  {
    date: "2025-09-21",
    pickups: { completed: 78, pending: 3, arise: 1 },
  },
  {
    date: "2025-09-22",
    pickups: { completed: 80, pending: 3, arise: 1 },
  },
  {
    date: "2025-09-23",
    pickups: { completed: 82, pending: 2, arise: 1 },
  },
  {
    date: "2025-09-24",
    pickups: { completed: 85, pending: 2, arise: 0 },
  },
  {
    date: "2025-09-25",
    pickups: { completed: 88, pending: 2, arise: 0 },
  },
  {
    date: "2025-09-26",
    pickups: { completed: 90, pending: 1, arise: 0 },
  },
  {
    date: "2025-09-27",
    pickups: { completed: 92, pending: 2, arise: 1 },
  },
  {
    date: "2025-09-28",
    pickups: { completed: 95, pending: 1, arise: 0 },
  },
  {
    date: "2025-09-29",
    pickups: { completed: 97, pending: 1, arise: 0 },
  },
  {
    date: "2025-09-30",
    pickups: { completed: 100, pending: 1, arise: 0 },
  },
];

const AdminPickupAreaChart = () => {
  const data = pickupsToAreaData(pickupDailyData);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <CartesianGrid opacity={0.05} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <defs>
          {/* RESOLVED */}
          <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
          </linearGradient>

          {/* PENDING */}
          <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.1} />
          </linearGradient>

          {/* ARISE */}
          <linearGradient id="ariseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="resolved"
          stroke="#22c55e"
          fill="url(#resolvedGradient)"
        />

        <Area
          type="monotone"
          dataKey="pending"
          stroke="#f59e0b"
          fill="url(#pendingGradient)"
        />

        <Area
          type="monotone"
          dataKey="arise"
          stroke="#ef4444"
          fill="url(#ariseGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AdminPickupAreaChart;

const gradientOffset = (data) => {
  const values = data.flatMap((d) => [d.resolved, d.pending, d.arise]);
  const max = Math.max(...values);
  const min = Math.min(...values);

  if (max <= 0) return 0;
  if (min >= 0) return 1;

  return max / (max - min);
};

const pickupsToAreaData = (dailyStats = []) => {
  return dailyStats.map((day) => ({
    date: day.date,

    // Positive (resolved)
    resolved: day.pickups.completed,

    // Mild negative
    pending: -day.pickups.pending * 0.5,

    // Strong negative
    arise: -day.pickups.arise * 1,
  }));
};
