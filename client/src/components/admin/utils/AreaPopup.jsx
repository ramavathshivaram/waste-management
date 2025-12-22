import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AreaPopup = ({ area }) => {
  const navigate = useNavigate();
  return (
    <div className="w-56 text-sm">
      {/* Title */}
      <div className="border-b">
        <p className="font-semibold text-base text-gray-900">{area.name}</p>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Collector</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              area.collectorId
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {area.collectorId ? "Assigned" : "Not Assigned"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Centre</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              area.centreId
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {area.centreId ? "Assigned" : "Not Assigned"}
          </span>
        </div>
      </div>

      {/* Action */}
      <Button
        size="sm"
        className="w-full mt-2"
        onClick={() => navigate(`/admin/area/${area._id}`)}
      >
        View Details
      </Button>
    </div>
  );
};

export default AreaPopup;
