import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../sections/Navbar";

const RootLayout = ({ links }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar links={links} />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
