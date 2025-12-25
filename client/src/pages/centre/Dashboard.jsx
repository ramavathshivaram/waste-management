import React from "react";
import { useCentreDashboard } from "../../hooks/use-centre-query.js";
import AreaMap from "../../components/centre/AreaMap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCentreDashboard();

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load dashboard</div>;
  }

  const { areas = [], centre } = data || {};

  return (
    <div className="grid grid-rows-[100px_1fr] h-full">
      {/* Header */}
      <div className="px-6 flex items-center font-semibold text-lg">
        {centre?.name || "Centre Dashboard"}
        <Button
          onClick={() => {
            navigate("/centre/verify");
          }}
        >
          Verify Collector
        </Button>
      </div>

      {/* Map */}
      <Card className="h-full p-0 overflow-hidden">
        <AreaMap areas={areas} />
      </Card>
    </div>
  );
};

export default Dashboard;
