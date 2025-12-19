import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
import DetailsNavbar from "../../components/sections/DetailsNavbar";

const DetailsRootlayout = () => {
  return (
    <div>
      <DetailsNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DetailsRootlayout;
