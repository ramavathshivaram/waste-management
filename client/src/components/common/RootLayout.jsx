import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../sections/Navbar";

const RootLayout = ({ links }) => {

  


  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar links={links} />
      <div className="w-full mx-auto max-w-6xl h-[calc(100vh-4.5rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
