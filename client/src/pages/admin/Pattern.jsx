import React from "react";
import KpiCard from "@/components/common/KpiCard";
import { Package, Truck, Building2, AlertTriangle } from "lucide-react";
import { useAdminDashboard } from "../../hooks/use-admin-query.js";
import AdminRadarChart from "../../components/admin/charts/AdminRadarChart";
import AdminLineChat from "../../components/admin/charts/AdminLineChat";
import AdminPickupAreaChart from "../../components/admin/charts/AdminPickupAreaChart";
import AdminIllegalDumpAreaChart from "../../components/admin/charts/AdminIllegalDumpAreaChart";
import PickupCluster from "../../components/common/PickupCluster.jsx";

const COLORS = {
  pickups: {
    bg: "bg-blue-500/10",
    text: "text-blue-700",
  },
  illegalDumps: {
    bg: "bg-red-500/10",
    text: "text-red-700",
  },
  centres: {
    bg: "bg-green-500/10",
    text: "text-green-700",
  },
  collectors: {
    bg: "bg-amber-500/10",
    text: "text-amber-700",
  },
};

const Dashboard = () => {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (!data) return <div>No dashboard data</div>;

  const { totals } = data;

  return (
    <div className="p-4 space-y-6 h-full">
      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-2 gap-3">
          <KpiCard
            title="Pickups"
            value={120}
            pending={34}
            completed={86}
            icon={Package}
            trend="up"
          />

          <KpiCard
            title="Collectors"
            value={18}
            pending={2}
            completed={16}
            icon={Truck}
          />

          <KpiCard
            title="Centres"
            value={6}
            pending={1}
            completed={5}
            icon={Building2}
            trend="down"
          />
          <KpiCard
            title="Illegal Dumps"
            value={totals.illegalDumps}
            icon={AlertTriangle}
            pending={1}
            completed={5}
          />
        </div>
        <div className="border rounded-2xl">
          {/* // Simple Radar Chart */}
          <AdminRadarChart />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 border rounded-2xl">
          <AdminLineChat />
        </div>
        <div className=" border rounded-2xl">
          <AdminPickupAreaChart />
        </div>
        <div className=" border rounded-2xl">
          <AdminIllegalDumpAreaChart />
        </div>
        <div className="col-span-2 border rounded-2xl">
          <PickupCluster/>
        </div>
      </div>

      <div className="rounded-xl shadow p-2 border space-y-4">
        <div className="flex justify-evenly gap-4">
          {Object.entries(COLORS).map(([key, color]) => (
            <div key={key} className="flex items-center gap-3">
              <div className={`p-2 rounded-sm ${color.bg}`}>
                <span className={`capitalize text-sm ${color.text}`}>
                  {key}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

//  Area Chart fill by value
//  Simple Line Chart

export default Dashboard;
