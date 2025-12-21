import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

import useUserAllPickupRequests from "../../hooks/citizen/queries/useUserAllPickupRequests.js";
import useUserAllIllegalDumps from "../../hooks/citizen/queries/useUserAllIllegalDumps.js";

import PickupRequestCard from "../../components/common/PickupRequestCard.jsx";
import ReportCard from "../../components/common/Reportcard.jsx";

/* ---------- helpers ---------- */
const getStatusCount = (items = [], status) =>
  items.filter((i) => i.status === status).length;

const getMultipleStatusCount = (items = [], statuses = []) =>
  items.filter((i) => statuses.includes(i.status)).length;

const SummaryCard = ({ title, value, sub }) => (
  <div className=" rounded-xl p-4shadow-sm">
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
    {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
  </div>
);

/* ---------- dashboard ---------- */
const Dashboard = () => {
  const navigate = useNavigate();

  const {
    data: pickupRes,
    isLoading: pickupLoading,
    error: pickupError,
  } = useUserAllPickupRequests();

  const {
    data: dumpRes,
    isLoading: dumpLoading,
    error: dumpError,
  } = useUserAllIllegalDumps();

  const pickupRequests = pickupRes?.data || [];
  const illegalDumps = dumpRes?.data || [];

  if (pickupLoading || dumpLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );
  }

  /* ---------- counts ---------- */
  const pendingPickups = getMultipleStatusCount(pickupRequests, [
    "pending",
    "assigned",
  ]);

  const completedPickups = getStatusCount(pickupRequests, "completed");

  const unresolvedDumps = getMultipleStatusCount(illegalDumps, [
    "new",
    "in-review",
  ]);

  const resolvedDumps = getStatusCount(illegalDumps, "resolved");

  return (
    <div className="min-h-screen p-6 space-y-12">
      {/* ACTION BAR */}
      <div className="flex justify-end gap-3">
        <Button onClick={() => navigate("/citizen/request")}>
          Create Pickup
        </Button>
        <Button variant="outline" onClick={() => navigate("/citizen/report")}>
          Report Illegal Dump
        </Button>
      </div>

      {/* SUMMARY */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Overview</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Pickups"
            value={pickupRequests.length}
            sub={`${pendingPickups} pending`}
          />
          <SummaryCard title="Completed Pickups" value={completedPickups} />
          <SummaryCard
            title="Illegal Dump Reports"
            value={illegalDumps.length}
            sub={`${unresolvedDumps} unresolved`}
          />
          <SummaryCard title="Resolved Dumps" value={resolvedDumps} />
        </div>
      </section>

      {/* PICKUP REQUESTS */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Your Pickup Requests</h1>

        {pickupError ? (
          <p className="text-red-500">Failed to load pickup requests</p>
        ) : pickupRequests.length === 0 ? (
          <p className="text-gray-600">
            You haven’t created any pickup requests yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {pickupRequests.map((req) => (
              <PickupRequestCard req={req} key={req._id} />
            ))}
          </div>
        )}
      </section>

      {/* ILLEGAL DUMP REPORTS */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Your Illegal Dump Reports</h1>

        {dumpError ? (
          <p className="text-red-500">Failed to load illegal dumps</p>
        ) : illegalDumps.length === 0 ? (
          <p className="text-gray-600">
            You have not reported any illegal dumping yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {illegalDumps.map((dump) => (
              <ReportCard dump={dump} key={dump._id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
