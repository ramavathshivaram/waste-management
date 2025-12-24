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
      <div className="h-full rounded-2xl overflow-hidden mt-2">
        {currentPickup ? (
          <LiveTrackingRoute pickup={currentPickup} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No pending pickups 🎉
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-5 flex gap-5 justify-end">
        <CancelButton pickupId={currentPickup?.id} />
        <FinishButton pickupId={currentPickup?.id} />
      </div>
    </div>
  );
};

export default MapDetails;
