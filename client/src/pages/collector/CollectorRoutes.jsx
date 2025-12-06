import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RootLayout from "../../components/common/RootLayout";

const links = [
  {
    label: "Dashboard",
    path: "/collector",
  },
  {
    label: "Search",
    path: "/collector/search",
  },
  {
    label: "Request",
    path: "/collector/request",
  },
  {
    label: "Report",
    path: "/collector/report",
  },
];
const CollectorRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout links={links} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default CollectorRoutes;
