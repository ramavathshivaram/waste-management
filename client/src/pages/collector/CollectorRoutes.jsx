import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import UnderProcess from "./UnderProcess";
import Update from "./Update";
import UnderProcessProtectedRoute from "../../components/common/UnderProcessProtectedRoute";

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
        <Route path="/" element={<RootLayout links={links} />}>
          <Route
            path="/"
            element={
              <UnderProcessProtectedRoute>
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

export default CollectorRoutes;
