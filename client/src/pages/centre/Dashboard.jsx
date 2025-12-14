import React, { useEffect } from "react";
import { useCentreDashboard } from "../../hooks/use-centre-query.js";
import useCentreStore from "../../stores/centreStore.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const setCentre = useCentreStore((s) => s.setCentre);
  const { data } = useCentreDashboard();

  useEffect(() => {
    if (data) {
      if (data.isAdminVerified === false) {
        navigate(`/centre/under-process`);
      } else if (data.isApproved === false) {
        navigate(`/centre/rejected`);
      }
      setCentre(data);
    }
  }, [data, setCentre]);

  return <div>centre dashborad</div>;
};

export default Dashboard;
