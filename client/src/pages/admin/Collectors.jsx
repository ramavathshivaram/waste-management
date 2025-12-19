import React, { useState } from "react";
import { useAdminCollectors } from "../../hooks/use-admin-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Section from "../../components/sections/Section";
import { Card } from "@/components/ui/card";

const Collectors = () => {
  const { data = [], isLoading } = useAdminCollectors();
  const [filter, setFilter] = useState("approved");
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // Separate collectors
  const pendingCollectors = data.filter((c) => !c.isApproved);
  const approvedCollectors = data.filter((c) => c.isApproved);

  // 🔍 Search logic
  const applySearch = (list) =>
    list.filter((c) =>
      [c.licenseNumber, c.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // Filter + search logic
  const visibleCollectors =
    filter === "approved"
      ? applySearch(approvedCollectors)
      : filter === "pending"
      ? applySearch(pendingCollectors)
      : applySearch(data);

  return (
    <div className="space-y-6 px-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Collectors</h2>
          <p className="text-sm text-gray-500">
            Manage and approve waste collectors
          </p>
        </div>

        <Badge variant="outline">Total: {visibleCollectors.length}</Badge>
      </div>

      {/* SEARCH + FILTER BAR */}
      <Card className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between p-3">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by license or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>

          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending ({pendingCollectors.length})
          </Button>

          <Button
            variant={filter === "approved" ? "default" : "outline"}
            onClick={() => setFilter("approved")}
          >
            Approved ({approvedCollectors.length})
          </Button>
          <Button variant={"outline"}>Rejected</Button>
        </div>
      </Card>

      {/* CONTENT */}
      {filter === "all" ? (
        <>
          <Section
            title="Pending Approval"
            data={applySearch(pendingCollectors)}
          />
          <Section
            title="Approved Collectors"
            data={applySearch(approvedCollectors)}
          />
        </>
      ) : (
        <Section
          title={
            filter === "pending" ? "Pending Approval" : "Approved Collectors"
          }
          data={visibleCollectors}
        />
      )}
    </div>
  );
};

export default Collectors;
