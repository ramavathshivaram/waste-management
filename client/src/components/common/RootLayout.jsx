import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const CitizenRootLayout = ({ links }) => {
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
