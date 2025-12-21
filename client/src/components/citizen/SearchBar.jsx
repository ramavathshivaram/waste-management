import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
const SearchBar = ({ setSearchedCentre }) => {
   const [search, setSearch] = useState("");
  return (
    <div>
      <Card className="p-1">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            className="w-full bg-transparent outline-none max-w-xl"
            placeholder="Search for a centre"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>
    </div>
  );
};

export default SearchBar;
