import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ProfileIcon from "../common/ProfileIcon";

const Navbar = ({ links }) => {
  return (
    <div className="w-full h-16">
      <nav className="fixed z-9999 top-0 left-0 right-0">
        <div className="flex justify-between items-center h-16 px-8">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Logo</h1>

          {/* Navigation Links */}
          <ul className="flex items-center gap-6 p-4 rounded-2xl shadow-sm border border-gray-800  backdrop-blur-sm">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                end={link.path === ""}
                className={({ isActive }) =>
                  `text-md font-medium ${
                    isActive
                      ? "text-gray-600 underline underline-offset-4"
                      : "text-gray-500 hover:text-gray-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </ul>

          {/* Logout */}
          <ProfileIcon />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
