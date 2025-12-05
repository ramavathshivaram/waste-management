import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ProfileIcon = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="scale-120">
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="">
          <div className="flex items-center gap-5">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-semibold flex-1">Name</h1>
            <Button size="sm">Logout</Button>
          </div>
          <div className="p-5">
            <p className="text-muted-foreground">Email</p>
            <p className="text-muted-foreground">Role</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileIcon;
