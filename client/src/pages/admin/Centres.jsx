import React, { useState } from "react";
import { useAdminCentres } from "../../hooks/use-admin-query";
import AdminCentreCard from "../../components/common/AdminCentreCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const Centres = () => {
  const { data = [], isLoading } = useAdminCentres();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [approvalFilter, setApprovalFilter] = useState("All");

  if (isLoading) {
    return <p className="text-center py-10">Loading centres...</p>;
  }

  if (!data.length) {
    return <p className="text-center py-10 text-gray-500">No centres found</p>;
  }

  // 🔍 FILTER LOGIC
  const filteredCentres = data.filter((centre) => {
    const matchSearch =
      centre.name?.toLowerCase().includes(search.toLowerCase()) ||
      centre.acceptedWasteTypes?.some((t) =>
        t.toLowerCase().includes(search.toLowerCase())
      );

    const matchStatus =
      statusFilter === "all" || centre.status === statusFilter;

    const matchApproval =
      approvalFilter === "All" ||
      (approvalFilter === "Approved" && centre.isApproved) ||
      (approvalFilter === "Pending" && !centre.isApproved);

    return matchSearch && matchStatus && matchApproval;
  });

  return (
    <div className="space-y-6 px-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Centres</h2>
          <p className="text-sm text-gray-500">
            Manage waste collection centres
          </p>
        </div>

        <Badge variant="outline">Total: {filteredCentres.length}</Badge>
      </div>

      {/* SEARCH + FILTER BAR */}
      <Card className="p-2">
        <div className="flex w-full p-2 items-center justify-between gap-2">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by centre name or waste type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 flex-wrap">
            {["All", "Approved", "Pending"].map((type) => (
              <Button
                key={type}
                variant={approvalFilter === type ? "default" : "outline"}
                onClick={() => setApprovalFilter(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* CARD GRID */}
      {filteredCentres.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No centres match your filters
        </p>
      ) : (
        <div className="grid-container">
          {filteredCentres.map((centre) => (
            <AdminCentreCard key={centre._id} centre={centre} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Centres;
