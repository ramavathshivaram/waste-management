import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";
import Update from "../centre/Update";
import UnderProcess from "../UnderProcess";
import useUserStore from "../../stores/useUserStore.js";
import UnderProcessProtectedRoute from "../../components/common/UnderProcessProtectedRoute";

const links = [
  {
    label: "Dashboard",
    path: "/citizen",
  },
];
const CentreRoutes = () => {
  const user = useUserStore((s) => s.user);
  console.log(user)
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout links={links} />}>
          <Route
            path="/"
            element={
              <UnderProcessProtectedRoute data={user}>
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
