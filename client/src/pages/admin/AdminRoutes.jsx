import React from "react";
import { Routes, Route } from "react-router-dom";
import Pattern from "./Pattern";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Pickups from "./Pickups";
import Collectors from "./Collectors";
import Centres from "./Centres";
import IllegalDumps from "./IllegalDumps";
import AdminMap from "./AdminMap";
import AdminAreaMap from "./AdminAreaMap";
import CentreDetails from "./CentreDetails";
import CollectorDetails from "./CollectorDetails";
import AddArea from "./AddArea";
import UpdateArea from "./UpdateArea";
import AreaDetails from "./AreaDetails";

// Sidebar / Navigation Links
const links = [
  {
    label: "Pattern",
    path: "/admin",
  },
  {
    label: "management",
    path: "/admin/management",
    children: [
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
        path: "/admin/pickups",
      },
      {
        label: "Illegal Dumps",
        path: "/admin/illegal-dumps",
      },
      {
        label: "Area",
        path: "/admin/area",
      },
    ],
  },
  {
    label: "Map",
    path: "/admin/map",
  },
];

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout links={links} />}>
        <Route path="/" element={<Pattern />} />

        <Route path="collectors" element={<Collectors />} />
        <Route path="centres" element={<Centres />} />
        <Route path="pickups" element={<Pickups />} />
        <Route path="illegal-dumps" element={<IllegalDumps />} />
        <Route path="area" element={<AdminAreaMap />} />

        <Route path="area/:id" element={<AreaDetails />} />

        <Route path="area/create" element={<AddArea />} />
        <Route path="area/update" element={<UpdateArea />} />

        <Route path="centre" element={<CentreDetails />} />
        <Route path="collector" element={<CollectorDetails />} />
        <Route path="map" element={<AdminMap />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
