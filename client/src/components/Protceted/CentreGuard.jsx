import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCentreMe } from "@/hooks/use-centre-query.js";
import UnderProcess from "../../pages/centre/UnderProcess";

const CentreGuard = () => {
  const { data, isLoading, isError } = useCentreMe();

  if (isLoading) {
    return <div className="p-4">Loading centre profile...</div>;
  }

  if (isError || !data || !data.status == "active") {
    return <UnderProcess />;
  }

  if (!data.status == "rejected") {
    return <Navigate to="/centre/rejected" replace />;
  }

  console.log(data);

  return <Outlet />;
};

export default CentreGuard;
