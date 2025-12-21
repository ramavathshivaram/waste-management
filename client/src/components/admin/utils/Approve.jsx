import React, { Activity } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApprove } from "@/hooks/use-admin-mutate.js";
import { Check, X } from "lucide-react";

const Approve = ({ id, area, label, currentstatus }) => {
  const { mutate, isPending } = useApprove();

   if (currentstatus !== "inactive") return null;

  const handleApprove = (status = "rejected") => {
    mutate({
      id,
      status,
      areaId: area?.id,
      label,
    });
  };

  const title =
    label === "collector" ? "Collector Approval" : "Centre Approval";

  return (
      <Card className="p-4 border border-dashed">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Title */}
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {area?.name && (
              <p className="text-sm text-muted-foreground">Area: {area.name}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={isPending}
              onClick={() => handleApprove("active")}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Check className="w-4 h-4 mr-1" />
              {isPending ? "Approving..." : "Approve"}
            </Button>

            <Button
              size="sm"
              variant="destructive"
              disabled={isPending}
              onClick={() => handleApprove("rejected")}
            >
              <X className="w-4 h-4 mr-1" />
              {isPending ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        </div>
      </Card>
  );
};

export default Approve;
