import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApproveCollector } from "@/hooks/use-admin-mutate.js";

const Approve = ({ id }) => {
  const { mutate, isPending } = useApproveCollector();

  const handleApprove = (isApproved) => {
    mutate({ id, isApproved });
  };

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-lg font-semibold">Collector Approval</h1>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={isPending}
            onClick={() => handleApprove(true)}
            className="bg-green-300 text-green-700 hover:bg-green-200 hover:text-green-800"
          >
            {isPending ? "Approving..." : "Approve"}
          </Button>

          <Button
            size="sm"
            disabled={isPending}
            onClick={() => handleApprove(false)}
            className="bg-red-300 text-red-700 hover:bg-red-200 hover:text-red-800"
          >
            {isPending ? "Rejecting..." : "Reject"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Approve;
