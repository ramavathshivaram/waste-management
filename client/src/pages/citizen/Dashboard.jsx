import React from "react";
import useUserAllPickupRequests from "../../hooks/citizen/queries/useUserAllPickupRequests.js";
import useUserAllIllegalDumps from "../../hooks/citizen/queries/useUserAllIllegalDumps.js";
import { Loader2 } from "lucide-react";
import PickupRequestCard from "../../components/common/PickupRequestCard.jsx";
import Reportcard from "../../components/common/Reportcard.jsx";

const Dashboard = () => {
  const { data, isLoading, error } = useUserAllPickupRequests();
  const { data: illegalDumpData, isLoading: dumpLoading } =
    useUserAllIllegalDumps();

  const pickupRequests = data?.data || [];
  const illegalDumps = illegalDumpData?.data || [];

  if (isLoading || dumpLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500">Failed to load dashboard data</p>
    );

  return (
    <div className="min-h-screen bg-white text-black p-6 space-y-12">
      {/* PICKUP REQUEST SECTION */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Your Pickup Requests</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {pickupRequests.map((req, idx) => (
            <PickupRequestCard req={req} key={idx} />
          ))}
        </div>
      </div>

      {/* ILLEGAL DUMP REPORT SECTION */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Your Illegal Dump Reports</h1>

        {illegalDumps.length === 0 ? (
          <p className="text-gray-700">
            You have not reported any illegal dumping yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {illegalDumps.map((dump) => (
              <Reportcard dump={dump} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
