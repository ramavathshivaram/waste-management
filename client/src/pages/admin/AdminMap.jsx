import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminMapDetails from "../../components/common/AdminMapDetails";
import { Plus, Delete, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const AdminMap = () => {
  const [filters, setFilters] = useState([]);

  const [search, setSearch] = useState("");

  const toggleFilter = (key) => {
    setFilters(
      (prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key) // remove
          : [...prev, key] // add
    );
  };

  const buttons = ["centres", "collectors", "pickups"];

  return (
    <div className="flex flex-col gap-3 p-3 h-full">
      {/* FILTER BAR */}
      <Card className="p-3 space-y-3">
        <div className="space-y-3">
          {/* SEARCH */}
          <div className="flex gap-2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by centre name or waste type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Search</Button>
          </div>

          <Separator />

          {/* FILTERS */}
          <div className="flex gap-2 flex-wrap">
            {buttons.map((btn) => (
              <Button
                variant={filters.includes(btn) ? "default" : "outline"}
                onClick={() => toggleFilter(btn)}
              >
                {btn} {filters.includes(btn) ? <Delete /> : <Plus />}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* MAP */}
      <div className="flex-1 h-full">
        <AdminMapDetails filters={filters} search={search} />
      </div>
    </div>
  );
};

export default AdminMap;
