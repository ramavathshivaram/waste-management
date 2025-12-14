import React, { useState } from "react";
import { useAdminPickups } from "../../hooks/use-admin-query.js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AdminPickupCard from "../../components/common/AdminPickupCard.jsx";
import { Filter, ArrowUpDown, Search, X, CalendarDays } from "lucide-react";

const STATUS_FILTERS = [
  "pending",
  "accepted",
  "assigned",
  "in-progress",
  "completed",
  "rejected",
];

const Pickups = () => {
  const { data = [], isLoading } = useAdminPickups();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading pickups...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No pickups found
      </div>
    );
  }

  /* 🔍 FILTER LOGIC */
  const filteredData = data.filter((pickup) => {
    const matchSearch =
      pickup.wasteType?.toLowerCase().includes(search.toLowerCase()) ||
      pickup.address?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      selected.length === 0 || selected.includes(pickup.status);

    return matchSearch && matchStatus;
  });

  const addFilter = (status) => {
    setSelected((prev) => (prev.includes(status) ? prev : [...prev, status]));
  };

  const removeFilter = (status) => {
    setSelected((prev) => prev.filter((s) => s !== status));
  };

  return (
    <div className="space-y-6 px-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pickups</h2>
          <p className="text-sm text-gray-500">
            Manage and monitor waste pickup requests
          </p>
        </div>

        <Badge variant="outline">Total: {filteredData.length}</Badge>
      </div>

      {/* SEARCH + ACTION BAR */}
      <Card className="p-2 flex flex-col md:flex-row gap-4 md:items-center md:justify-between rounded-2xl">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by centre name or waste type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>

          <Button variant="outline" className="flex gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </Button>
          <Button variant="outline" className="flex gap-2">
            <CalendarDays className="w-4 h-4" />
            Date
          </Button>
        </div>
      </Card>

      {/* ACTIVE FILTERS */}
      {selected.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {selected.map((status) => (
            <Badge
              key={status}
              className="flex items-center gap-1 px-3 py-1 cursor-pointer"
              variant="secondary"
              onClick={() => removeFilter(status)}
            >
              {status}
              <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* FILTER OPTIONS */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((status) => (
          <Button
            key={status}
            size="sm"
            variant={selected.includes(status) ? "default" : "outline"}
            onClick={() => addFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* CARDS GRID */}
      <div className="grid-container">
        {filteredData.map((pickup) => (
          <AdminPickupCard key={pickup._id} pickup={pickup} />
        ))}
      </div>
    </div>
  );
};

export default Pickups;
