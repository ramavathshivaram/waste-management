import React from "react";
import { useCollector } from "../../hooks/use-collertor-query.js";
import useCollectorStore from "../../stores/collectorStore.js";

const Dashboard = () => {
  const setCollector = useCollectorStore((s) => s.setCollector);
  const { data } = useCollector();

  if (data) {
    setCollector(data);
  }
  return <div>Dashboard Dashboard</div>;
};

export default Dashboard;
