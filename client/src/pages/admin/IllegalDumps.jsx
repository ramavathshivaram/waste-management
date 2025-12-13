import React from "react";
import { useAdminIllegalDumps } from "../../hooks/use-admin-query.js";

const IllegalDumps = () => {
  const { data, isLoading } = useAdminIllegalDumps();

  if (isLoading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No illegal dump reports found</div>;
  }

  return (
    <div className="border border-black rounded-xl bg-white p-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {/* HEADER */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Image</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Address</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Severity</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Citizen</th>
            <th className="border px-3 py-2">Reported On</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((dump, index) => (
            <tr key={dump._id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 text-center">{index + 1}</td>

              <td className="border px-3 py-2 text-center">
                {dump.images?.length > 0 && (
                  <img
                    src={dump.images[0].url}
                    alt="illegal-dump"
                    className="w-12 h-12 object-cover rounded mx-auto"
                  />
                )}
              </td>

              <td className="border px-3 py-2 capitalize">
                {dump.locationText}
              </td>

              <td className="border px-3 py-2 max-w-xs truncate">
                {dump.address}
              </td>

              <td className="border px-3 py-2 max-w-xs truncate">
                {dump.description}
              </td>

              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      dump.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : dump.severity === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {dump.severity}
                </span>
              </td>

              <td className="border px-3 py-2">
                <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                  {dump.status}
                </span>
              </td>

              <td className="border px-3 py-2 text-xs">{dump.citizenId}</td>

              <td className="border px-3 py-2">
                {new Date(dump.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IllegalDumps;
