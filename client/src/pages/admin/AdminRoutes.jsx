import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Pickups from "./Pickups";

// Sidebar / Navigation Links
const links = [
  {
    label: "Dashboard",
    path: "/admin",
  },
  {
    label: "Pickups",
    path: "/admin/pickup",
  },
  {
    label: "Reports",
    path: "/admin/report",
  },
  {
    label: "Search",
    path: "/admin/search",
  },
];

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<RootLayout links={links} />}>
        <Route index element={<Dashboard />} />

        <Route path="pickup" element={<Pickups />} />
        <Route path="search" element={<div>Search Page</div>} />
        <Route path="report" element={<div>Report Page</div>} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
