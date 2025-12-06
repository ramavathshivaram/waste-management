import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import RootLayout from "../../components/common/RootLayout";
import PageNotFound from "../../components/common/PageNotFound";

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
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default CollectorRoutes;
