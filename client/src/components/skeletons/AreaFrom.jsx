import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AreaForm = ({ coordinates }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const canSave = name.trim() && coordinates.length >= 3 && description.trim();

  const handleSave = () => {
    if (!canSave) {
      toast.error("Area name and at least 3 points are required");
      return;
    }

    // Close polygon
    const closedCoords = [...coordinates, coordinates[0]];

    const payload = {
      name,
      description,
      area: {
        type: "Polygon",
        coordinates: [closedCoords], // MongoDB GeoJSON
      },
    };

    console.log("✅ Area Payload:", payload);

    // 🔥 Call API here
    // await createArea(payload)

    toast.success("Area ready to be saved");
  };

  return (
    <div className="space-y-2 p-4 rounded-xl border bg-background col-span-2">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Add Area</h1>{" "}
          <Button onClick={handleSave} disabled={!canSave}>
            Save Area
          </Button>
        </div>
        <p className="text-muted-foreground">Click on the map to add points.</p>
        <p className="text-muted-foreground text-sm">
          Minimum 3 points are required to create a polygon.
        </p>
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Area Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          placeholder="Area Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Points added: {coordinates.length}</span>
        {coordinates.length < 3 && (
          <span className="text-red-500">Add more points</span>
        )}
      </div>
    </div>
  );
};

export default AreaForm;
