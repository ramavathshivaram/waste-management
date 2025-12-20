import { Navigate, Outlet } from "react-router-dom";
import { useCollector } from "@/hooks/use-collertor-query";

const CollectorGuard = () => {
  const { data, isLoading, isError } = useCollector();

  if (isLoading) {
    return <div className="p-4">Loading collector profile...</div>;
  }

  if (isError || !data || !data.isAdminVerified) {
    return <Navigate to="/collector/under-process" replace />;
  }

  if (!data.isApproved) {
    return <Navigate to="/collector/rejected" replace />;
  }

  console.log(data)

  return <Outlet />;
};

export default CollectorGuard;
