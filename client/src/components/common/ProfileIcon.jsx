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
import { useNavigate } from "react-router-dom";

const ProfileIcon = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    await logoutUser();
    clearUser();
    navigate("/login");
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
          <div className="p-5">
            <p className="text-muted-foreground">{user.role}</p>
          </div>
        </div>
        <Button size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileIcon;
