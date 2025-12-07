import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper();

export const pickupColumns = [
  columnHelper.accessor("_id", {
    header: "ID",
    cell: (info) => info.getValue().slice(-6), // last 6 chars for readability
  }),

  columnHelper.accessor("images", {
    header: "Image",
    cell: ({ getValue }) => {
      const img = getValue()?.[0]?.url;
      return (
        <img
          src={img}
          alt="pickup"
          className="w-12 h-12 rounded border object-cover"
        />
      );
    },
  }),

  columnHelper.accessor("wasteType", {
    header: "Waste Type",
    cell: (info) => info.getValue().toUpperCase(),
  }),

  columnHelper.accessor("quantity", {
    header: "Qty",
  }),

  columnHelper.accessor("address", {
    header: "Address",
    cell: (info) => (
      <span className="truncate max-w-[120px] inline-block">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("scheduledDateTime", {
    header: "Scheduled",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <Badge className="border border-black">{info.getValue()}</Badge>
    ),
  }),
];
