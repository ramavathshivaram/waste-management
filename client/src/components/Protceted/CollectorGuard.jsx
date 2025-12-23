import { Navigate, Outlet } from "react-router-dom";
import { useCollectorMe } from "@/hooks/use-collertor-query";
import UnderProcess from "../../pages/collector/UnderProcess";

const CollectorGuard = () => {
  const { data, isLoading, isError } = useCollectorMe();

  if (isLoading) {
    return <div className="p-4">Loading collector profile...</div>;
  }


  if (isError || !data || data.status == "inactive") {
    return <UnderProcess />;
  }

  if (!data.status == "rejected") {
    return <Navigate to="/collector/rejected" replace />;
  }

  return <Outlet />;
};

export default CollectorGuard;
