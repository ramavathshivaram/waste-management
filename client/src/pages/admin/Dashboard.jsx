import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { useAdminDashboard } from "../../hooks/use-admin-query.js";

const COLORS = ["#22c55e", "#facc15", "#ef4444", "#3b82f6"];

const Dashboard = () => {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (!data) return <div>No dashboard data</div>;

  const { totals, pickupsByStatus, dumpsBySeverity, collectorsByStatus } = data;

  return (
    <div className="p-6 space-y-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Centres" value={totals.centres} />
        <KpiCard title="Collectors" value={totals.collectors} />
        <KpiCard title="Pickups" value={totals.pickups} />
        <KpiCard title="Illegal Dumps" value={totals.illegalDumps} />
      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pickups by Status */}
        <ChartCard title="Pickups by Status">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pickupsByStatus}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Collectors by Status */}
        <ChartCard title="Collectors by Status">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={collectorsByStatus}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Illegal Dumps by Severity */}
        <ChartCard title="Illegal Dumps by Severity">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dumpsBySeverity}
                dataKey="count"
                nameKey="severity"
                outerRadius={80}
                label
              >
                {dumpsBySeverity.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

/* ------------------- REUSABLE COMPONENTS ------------------- */

const KpiCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 border">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 border">
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default Dashboard;
