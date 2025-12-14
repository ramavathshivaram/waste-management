import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const KpiCard = ({
  title,
  value,
  pending = 0,
  completed = 0,
  icon: Icon,
  trend, // "up" | "down" | undefined
}) => {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm space-y-2">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-md text-muted-foreground">{title}</h1>
            {trend && (
              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  trend === "up" && "text-green-600",
                  trend === "down" && "text-red-600"
                )}
              >
                {trend === "up" ? (
                  <ArrowBigUp size={20} />
                ) : (
                  <ArrowBigDown size={20} />
                )}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold">{value}</h1>
        </div>

        {Icon && (
          <div className="p-2 rounded-lg bg-muted">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <Separator />

      {/* STATS */}
      <div className="flex justify-between text-sm">
        <div className="text-center flex-1">
          <p className="text-muted-foreground">Pending</p>
          <p className="font-medium">{pending}</p>
        </div>

        <Separator orientation="vertical" />

        <div className="text-center flex-1">
          <p className="text-muted-foreground">Completed</p>
          <p className="font-medium">{completed}</p>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
