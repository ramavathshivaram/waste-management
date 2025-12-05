import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RootLayout from "./RootLayout";
import Search from "./Search";
import Request from "./Request";
import Report from "./Report";

const CitizenRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/request" element={<Request />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </>
  );
};

export default CitizenRoutes;
