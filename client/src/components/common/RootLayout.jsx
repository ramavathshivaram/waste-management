import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const CitizenRootLayout = ({ links }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar links={links} />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default CitizenRootLayout;
