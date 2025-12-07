import React from "react";
import { useCollector } from "../../hooks/use-collertor-query.js";
import { useNavigate } from "react-router-dom";
import useCollectorStore from "../../stores/collectorStore.js";

const Dashboard = () => {
  const setCollector = useCollectorStore((s) => s.setCollector);
  const { data } = useCollector();
  console.log(data)

  if (data?.isAdminVerified === false) {
    setCollector(data);
  }
  return <div>Dashboard Dashboard</div>;
};

export default Dashboard;
