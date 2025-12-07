import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Pickups from "./Pickups";
import Approvals from "./Approvals";
import CollectorDetails from "./CollectorDetails";
import CentreDetails from "./CentreDetails";

// Sidebar / Navigation Links
const links = [
  {
    label: "Dashboard",
    path: "/admin",
  },
  {
    label: "Approvals",
    path: "/admin/approvals",
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
      <Route path="/" element={<RootLayout links={links} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="collector" element={<CollectorDetails />} />
        <Route path="centre" element={<CentreDetails />} />
        <Route path="pickup" element={<Pickups />} />
        <Route path="search" element={<div>Search Page</div>} />
        <Route path="report" element={<div>Report Page</div>} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
