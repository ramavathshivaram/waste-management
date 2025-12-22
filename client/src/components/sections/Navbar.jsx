import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import ProfileIcon from "../common/ProfileIcon";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const Navbar = ({ links,options }) => {
  return (
    <div className="w-full h-16">
      <nav className="fixed z-50 top-0 left-0 right-0 bg-background">
        <div className="flex justify-between items-center h-16 px-8">
          {/* Logo */}
          <h1 className="text-2xl font-bold animate-pulse italic">WM</h1>

          {/* Navigation */}
          <ul className="flex items-center gap-4 p-3 rounded-xl border shadow-sm backdrop-blur">
            {links.map((link, index) => {
              if (link.children) {
                return (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="font-medium">
                        {link.label}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                      {link.children.map((child, idx) => (
                        <DropdownMenuItem key={idx} asChild>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              isActive
                                ? "text-primary font-medium"
                                : "text-neutral-500 hover:text-neutral-700"
                            }
                          >
                            {child.label}
                          </NavLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <NavLink
                  key={index}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `text-md font-medium transition ${
                      isActive
                        ? "text-primary underline underline-offset-4"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </ul>

          {/* Profile */}
          <ProfileIcon options={options} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
