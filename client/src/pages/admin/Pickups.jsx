import React from "react";
import { useAdminPickups } from "../../hooks/use-admin-query.js";

const Pickups = () => {
  const { data, isLoading } = useAdminPickups();

  if (isLoading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No pickups found</div>;
  }

  return (
    <div className="border border-black rounded-xl bg-white p-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {/* HEADER */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Waste Type</th>
            <th className="border px-3 py-2">Quantity</th>
            <th className="border px-3 py-2">Address</th>
            <th className="border px-3 py-2">Scheduled Time</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Image</th>
            <th className="border px-3 py-2">Citizen</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((pickup, index) => (
            <tr key={pickup._id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 text-center">{index + 1}</td>

              <td className="border px-3 py-2 capitalize">
                {pickup.wasteType}
              </td>

              <td className="border px-3 py-2">{pickup.quantity}</td>

              <td className="border px-3 py-2">{pickup.address}</td>

              <td className="border px-3 py-2">
                {new Date(pickup.scheduledDateTime).toLocaleString()}
              </td>

              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      pickup.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : pickup.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {pickup.status}
                </span>
              </td>

              <td className="border px-3 py-2 text-center">
                {pickup.images?.length > 0 && (
                  <img
                    src={pickup.images[0].url}
                    alt="waste"
                    className="w-12 h-12 object-cover rounded mx-auto"
                  />
                )}
              </td>

              <td className="border px-3 py-2 text-xs">{pickup.citizenId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pickups;
