import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

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

const CitizenRootLayout = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar links={links} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CitizenRootLayout;
