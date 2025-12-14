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
          <ul className="flex items-center gap-4 p-3.5 rounded-xl shadow-sm border  backdrop-blur-xs">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                end={link.path === ""}
                className={({ isActive }) =>
                  `text-md font-medium ${
                    isActive
                      ? "text-neutral-500 underline underline-offset-4"
                      : " hover:text-gray-600 text-neutral-400"
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
