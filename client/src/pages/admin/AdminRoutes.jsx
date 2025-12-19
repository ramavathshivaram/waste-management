import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Pickups from "./Pickups";
import Collectors from "./Collectors";
import Centres from "./Centres";
import IllegalDumps from "./IllegalDumps";
import AdminMap from "./AdminMap";
import AdminAreaMap from "../../components/admin/map/AdminAreaMap";
import DetailsRootlayout from "./DetailsRootlayout";

// Sidebar / Navigation Links
const links = [
  {
    label: "Dashboard",
    path: "/admin",
  },
  {
    label: "details",
    path: "/admin/details",
  },
  {
    label: "Map",
    path: "/admin/map",
  },
  {
    label: "Area",
    path: "/admin/area",
  },
];

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout links={links} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="details" element={<DetailsRootlayout />}>
          <Route index element={<Collectors />} />
          <Route path="centres" element={<Centres />} />
          <Route path="pickups" element={<Pickups />} />
          <Route path="illegal-dumps" element={<IllegalDumps />} />
        </Route>
        <Route path="map" element={<AdminMap />} />
        <Route path="area" element={<AdminAreaMap />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
