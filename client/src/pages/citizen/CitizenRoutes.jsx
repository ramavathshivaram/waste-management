import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";
import Search from "./Search";
import Request from "./Request";
import Report from "./Report";
import PageNotFound from "../../components/common/PageNotFound";

const links = [
  {
    label: "Dashboard",
    path: "/citizen",
  },
  {
    label: "Search",
    path: "/citizen/search",
  },
  {
    label: "Request",
    path: "/citizen/request",
  },
  {
    label: "Report",
    path: "/citizen/report",
  },
];
const CitizenRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<RootLayout links={links} />}>
          <Route index element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/request" element={<Request />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default CitizenRoutes;
