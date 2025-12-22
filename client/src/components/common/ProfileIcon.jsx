import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useUserStore from "../../stores/useUserStore.js";
import { logoutUser } from "../../lib/api.js";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode.jsx";
import CentreStore from "../../stores/centreStore.js";
import CollectorStore from "../../stores/collectorStore.js";

const ProfileIcon = ({ options = [] }) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearCollector = CollectorStore((state) => state.clearCollector);
  const clearCentre = CentreStore((state) => state.clearCentre);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      clearUser();
      clearCollector();
      clearCentre();
      navigate("/login", { replace: true });
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="scale-120">
          <AvatarImage src="" />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <div>
          <div className="flex items-center gap-5">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-md font-semibold flex-1">{user?.name}</h1>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end-safe gap-4 mt-4">
          <DarkMode />
          <Button size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div>
          {options?.map((option) => (
            <Link to={option?.path}>
              <Button size="sm">{option?.label}</Button>
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileIcon;
