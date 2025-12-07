import React from "react";
import { useAdmin } from "../../hooks/use-admin-query.js";

const Dashboard = () => {
  const { data } = useAdmin();
  console.log(data);
  return <div>Dashboard Dashboard</div>;
};

export default Dashboard;
