import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import LiveTrackingRoute from "../../components/collector/LiveTrackingRoute.jsx";
import MapHeader from "./MapHeader.jsx";
import FinishButton from "../../components/collector/FinishButton.jsx";
import CancelButton from "../../components/collector/CancelButton.jsx";

const MapDetails = () => {
  const [currentPickup, setCurrentPickup] = useState(null);

  return (
    <div className="w-full h-full grid grid-rows-[100px_1fr_100px]">
      {/* Route order */}

      <MapHeader setCurrentPickup={setCurrentPickup} />
      {/* Map */}
      <div className="h-full mt-2 overflow-hidden rounded-2xl">
        {currentPickup ? (
          <LiveTrackingRoute pickup={currentPickup} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No pending pickups 🎉
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-5 p-5">
        <CancelButton pickupId={currentPickup?.id} />
        <FinishButton pickupId={currentPickup?.id} />
      </div>
    </div>
  );
};

export default MapDetails;
