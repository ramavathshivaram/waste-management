import React from "react";
import { useCollector } from "@/hooks/use-collertor-query.js";

const MapHeader = ({ setCurrentPickup }) => {
  const { data, isLoading } = useCollector();

  if (isLoading) return <div>Loading...</div>;

  const pickups = data.route.path;

  setCurrentPickup(pickups[2]);

  return (
    <div className="flex items-center justify-center gap-4 overflow-x-auto">
      <div className="px-3 py-1 font-medium text-blue-700 bg-blue-100 rounded">
        Collector
      </div>

      {pickups.map((pickup, idx) => (
        <div
          key={idx}
          className={`px-3 py-1 rounded font-medium border
              ${
                idx === 0
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-neutral-100 text-neutral-500"
              }`}
        >
          P{idx + 1}
        </div>
      ))}

      <div className="px-3 py-1 font-medium text-green-700 bg-green-100 rounded">
        Centre
      </div>
    </div>
  );
};

export default MapHeader;
