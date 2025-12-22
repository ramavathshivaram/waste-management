import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LiveLocationMap = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState([16.496958,80.681750]);
  return (
    <Card className="p-1">
      <div className="flex-1">
        <iframe
          src={`https://maps.google.com/maps?q=${location[0]},${location[1]}&z=15&output=embed`}
          className="w-full aspect-square rounded-xl border"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="flex justify-center -mt-4">
        <Button onClick={() => navigate("/admin/map")}>Open in Map</Button>
      </div>
    </Card>
  );
};

export default LiveLocationMap;
