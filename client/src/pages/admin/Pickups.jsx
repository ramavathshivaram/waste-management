import React from "react";
import { useAdminPickups } from "../../hooks/use-admin-query.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  "in-progress": "bg-indigo-100 text-indigo-700",
  picked: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Pickups = () => {
  const { data, isLoading } = useAdminPickups();

  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No pickups found</div>;

  return (
    <div className="border rounded-xl p-4 overflow-x-auto">
      <Table className="w-full border-collapse text-sm">
        <TableHeader>
          <TableRow className="">
            <TableHead className="border px-3 py-2">#</TableHead>
            <TableHead className="border px-3 py-2">Waste Type</TableHead>
            <TableHead className="border px-3 py-2">Quantity</TableHead>
            <TableHead className="border px-3 py-2">Address</TableHead>
            <TableHead className="border px-3 py-2">Scheduled Time</TableHead>
            <TableHead className="border px-3 py-2">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((pickup, index) => (
            <TableRow key={pickup._id} className="hover:bg-gray-50/10">
              <TableCell className="border px-3 py-2 text-center">
                {index + 1}
              </TableCell>

              <TableCell className="border px-3 py-2 capitalize">
                {pickup.wasteType}
              </TableCell>

              <TableCell className="border px-3 py-2">
                {pickup.quantity}
              </TableCell>

              <TableCell className="border px-3 py-2">
                {pickup.address}
              </TableCell>

              <TableCell className="border px-3 py-2">
                {pickup.scheduledDateTime
                  ? new Date(pickup.scheduledDateTime).toLocaleString()
                  : "—"}
              </TableCell>

              <TableCell className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusStyles[pickup.status] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {pickup.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Pickups;
