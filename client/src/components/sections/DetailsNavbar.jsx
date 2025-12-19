import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import clsx from "clsx";

const NAV_ITEMS = [
  { label: "Collectors", path: "/admin/details" },
  { label: "Centres", path: "/admin/details/centres" },
  { label: "Pickups", path: "/admin/details/pickups" },
  { label: "Illegal Dumps", path: "/admin/details/illegal-dumps" },
];

const DetailsNavbar = () => {
  return (
    <div className="flex p-2 pl-5">
      <nav>
        <Card className="px-4 py-2">
          <ul className="flex gap-6 relative">
            {NAV_ITEMS.map(({ label, path }) => (
              <li key={path} className="relative">
                <NavLink
                  to={path}
                  end
                  className={({ isActive }) =>
                    clsx(
                      "relative pb-1 text-sm font-medium transition-colors",
                      "hover:text-green-600",
                      isActive ? "text-green-600" : "text-muted-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}

                      {/* Active underline */}
                      {isActive && (
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-green-600 transition-all" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </Card>
      </nav>
    </div>
  );
};

export default DetailsNavbar;
