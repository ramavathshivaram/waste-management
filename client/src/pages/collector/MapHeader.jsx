import React from "react";
import { useCollector } from "../../hooks/use-collertor-query";

const MapHeader = ({ setCurrentPickup }) => {
  const { data, isLoading } = useCollector();

  if (isLoading) return <div>Loading...</div>;

  const pickups = data.route.path;

  setCurrentPickup(pickups[2]);

  return (
    <div className="flex items-center gap-4 justify-center overflow-x-auto">
      <div className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-medium">
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

      <div className="px-3 py-1 rounded bg-green-100 text-green-700 font-medium">
        Centre
      </div>
    </div>
  );
};

export default MapHeader;
