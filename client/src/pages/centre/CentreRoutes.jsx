import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Update from "../centre/Update";
import UnderProcess from "../UnderProcess";
import CentreGuard from "../../components/Protceted/CentreGuard.jsx";
import Verify from "./Verify.jsx";

const links = [
  {
    label: "Dashboard",
    path: "/citizen",
  },
];
const CentreRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<CentreGuard />}>
          <Route element={<RootLayout links={links} />}>
            <Route index element={<Dashboard />} />
            <Route path="/verify" element={<Verify />} />
          </Route>
        </Route>
        <Route path="/update" element={<Update />} />
        <Route path="/under-process" element={<UnderProcess />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default CentreRoutes;
