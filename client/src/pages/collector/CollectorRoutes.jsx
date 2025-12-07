import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import UnderProcess from "../UnderProcess";
import Update from "./Update";
import UnderProcessProtectedRoute from "../../components/common/UnderProcessProtectedRoute";
import useCollectorStore from "../../stores/collectorStore.js";

const links = [
  {
    label: "Dashboard",
    path: "/collector",
  },
];
const CollectorRoutes = () => {
  const collector = useCollectorStore((s) => s.collector);

  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout links={links} />}>
          <Route
            path="/"
            element={
              <UnderProcessProtectedRoute data={collector}>
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
