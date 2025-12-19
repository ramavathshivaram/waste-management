import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DetailsRootlayout = () => {
  return (
    <div>
      <nav className="w-full p-3 flex justify-center items-center">
        <ul className="flex gap-5">
          <li>
            <NavLink
              to="/admin/details"
              className={({ isActive }) => (isActive ? "text-green-600" : "")}
            >
              Collectors
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/details/centres">Centres</NavLink>
          </li>
          <li>
            <NavLink to="/admin/details/pickups">Pickups</NavLink>
          </li>
          <li>
            <NavLink to="/admin/details/illegal-dumps">Illegal Dumps</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DetailsRootlayout;
