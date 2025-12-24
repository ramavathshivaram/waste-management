import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import UnderProcess from "../UnderProcess";
import Update from "./Update";
import CollectorGuard from "../../components/Protceted/CollectorGuard";
import MapDetails from "./MapDetails";

const links = [
  {
    label: "Dashboard",
    path: "/collector",
  },
];

const CollectorRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<CollectorGuard />}>
          <Route element={<RootLayout links={links} />}>
            <Route index element={<Dashboard />} />
            <Route path="/map" element={<MapDetails />} />
          </Route>
        </Route>

        <Route path="/update" element={<Update />} />
        <Route path="/under-process" element={<UnderProcess />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default CollectorRoutes;
