import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

const AddMapCoordinatesList = ({ coordinates = [], onRemovePoint }) => {
  return (
    <Card className="flex flex-col col-span-1 gap-2 p-3">
      <h3 className="text-sm font-semibold">Added Points</h3>

      <ScrollArea className="max-h-[calc(100%-1rem)] p-2">
        {coordinates.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Click on the map to add points
          </p>
        ) : (
          coordinates.map(([lng, lat], index) => (
            <div
              key={index}
              className="group flex items-center justify-between gap-2 border-b border-border py-1 px-2 text-xs text-muted-foreground hover:bg-muted/50"
            >
              <span className="w-5">{index + 1}.</span>

              <span className="flex-1">Lat: {lat.toFixed(5)}</span>
              <span className="flex-1">Lng: {lng.toFixed(5)}</span>

              <X
                size={18}
                onClick={() => onRemovePoint?.(index)}
                className="cursor-pointer text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-red-600"
              />
            </div>
          ))
        )}
      </ScrollArea>
    </Card>
  );
};

export default AddMapCoordinatesList;
