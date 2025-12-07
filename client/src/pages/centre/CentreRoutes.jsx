import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Update from "../centre/Update";
import UnderProcess from "../UnderProcess";
import centreStore from "../../stores/centreStore.js";
import UnderProcessProtectedRoute from "../../components/common/UnderProcessProtectedRoute";

const links = [
  {
    label: "Dashboard",
    path: "/citizen",
  },
];
const CentreRoutes = () => {
  const centre = centreStore((s) => s.centre);
  return (
    <>
      <Routes>
        <Route path="" element={<RootLayout links={links} />}>
          <Route
            index
            element={
              <UnderProcessProtectedRoute data={centre}>
                <Dashboard />
              </UnderProcessProtectedRoute>
            }
          />
        </Route>
        <Route path="/update" element={<Update />} />
        <Route path="/under-process" element={<UnderProcess />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default CentreRoutes;
