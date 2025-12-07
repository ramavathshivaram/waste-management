import React from "react";
import { useCentreQuery } from "../../hooks/use-centre-query.js";
import useCentreStore from "../../stores/centreStore.js";

const Dashboard = () => {
  const setCentre = useCentreStore((s) => s.setCentre);
  const { data } = useCentreQuery();

  if (data) {
    setCentre(data);
  }

  return <div>centre dashborad</div>;
};

export default Dashboard;
