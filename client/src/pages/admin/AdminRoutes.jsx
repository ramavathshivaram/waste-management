import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Pickups from "./Pickups";
import Collectors from "./Collectors";
import Centres from "./Centres";
import CollectorDetails from "./CollectorDetails";
import CentreDetails from "./CentreDetails";
import IllegalDumps from "./IllegalDumps";

// Sidebar / Navigation Links
const links = [
  {
    label: "Dashboard",
    path: "/admin",
  },
  {
    label: "Collectors",
    path: "/admin/collectors",
  },
  {
    label: "Centres",
    path: "/admin/centres",
  },
  {
    label: "Pickups",
    path: "/admin/pickup",
  },
  {
    label: "Illegal Dumps",
    path: "/admin/illegal-dumps",
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
        <Route path="collectors" element={<Collectors />} />
        <Route path="centres" element={<Centres />} />
        <Route path="collector" element={<CollectorDetails />} />
        <Route path="centre" element={<CentreDetails />} />
        <Route path="pickup" element={<Pickups />} />
        <Route path="search" element={<div>Search Page</div>} />
        <Route path="illegal-dumps" element={<IllegalDumps />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
