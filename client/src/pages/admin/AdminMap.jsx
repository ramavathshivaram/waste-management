import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle } from "lucide-react";
import AdminMapDetails from "../../components/common/AdminMapDetails";

const AdminMap = () => {
  return (
    <div className="flex flex-col gap-3 p-3 ">
      <Card className="">some filters</Card>
      <AdminMapDetails  />
    </div>
  );
};

export default AdminMap;
