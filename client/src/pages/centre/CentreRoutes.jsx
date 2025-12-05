import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "../../components/common/RootLayout";


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
const CentreRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<RootLayout links={links} />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="/search" element={<Search />} />
          <Route path="/request" element={<Request />} />
          <Route path="/report" element={<Report />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default CentreRoutes;
