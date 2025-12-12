import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import ProfileIcon from "./ProfileIcon";

const Navbar = ({ links }) => {
  return (
    <nav className="border-b">
      <div className="flex justify-between items-center h-16 px-8">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Logo</h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 p-4 rounded-2xl shadow-sm border border-gray-800">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-primary underline underline-offset-4"
                    : "text-muted-foreground hover:text-primary"
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
  );
};

export default Navbar;
