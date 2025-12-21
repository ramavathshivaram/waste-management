import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const MapCard = ({ locationName, longitude, latitude }) => {
  return (
    <Card className="col-span-1 p-1">
      <CardHeader className="p-1 -mb-7">
        <CardTitle className="text-center text-2xl">{locationName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-1">
        {/* MAP */}

        <iframe
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          className="w-full aspect-square rounded-xl border"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="flex justify-center">
          <Button>Open in Maps</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapCard;
