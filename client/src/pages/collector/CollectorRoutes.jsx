import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RootLayout from "../../components/common/RootLayout";

const links = [
  {
    label: "Dashboard",
    path: "/citizen",
  },
  {
    label: "Search",
    path: "/citizen/search",
  },
  {
    label: "Request",
    path: "/citizen/request",
  },
  {
    label: "Report",
    path: "/citizen/report",
  },
];
const CollectorRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<RootLayout links={links} />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default CollectorRoutes;
