import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateArea, useDeleteArea } from "../../hooks/use-admin-mutate.js";
import { useNavigate } from "react-router-dom";

const UpdateAreaForm = ({ coordinates = [], area = {} }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutateAsync, isLoading } = useUpdateArea();
  const { mutateAsync: deleteArea, isLoading: isDeleting } = useDeleteArea();

  // 🔁 Sync form when area loads
  useEffect(() => {
    const func = async () => {
      if (area?.name) setName(area.name);
      if (area?.description) setDescription(area.description);
    };
    func();
  }, [area]);

  const canSave =
    name.trim().length > 0 &&
    description.trim().length > 0 &&
    coordinates.length >= 3;

  const handleSave = async () => {
    if (!canSave) {
      toast.error("Name, description and at least 3 points are required");
      return;
    }

    try {
      const first = coordinates[0];
      const last = coordinates[coordinates.length - 1];

      const closedCoords =
        first[0] === last[0] && first[1] === last[1]
          ? coordinates
          : [...coordinates, first];

      const payload = {
        name,
        description,
        area: {
          type: "Polygon",
          coordinates: [closedCoords],
        },
      };

      await mutateAsync({ id: area._id, payload });

      navigate("/admin/area");
    } catch (error) {
      toast.error("Failed to update area");
    }
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure?")) return;
      await deleteArea(area._id);
      navigate("/admin/area");
    } catch (error) {
      toast.error("Failed to delete area");
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-xl border bg-background col-span-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Update Area</h1>
        <div className="space-x-1">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isLoading || isDeleting}
          >
            {isLoading ? "Deleting..." : "Delete Area"}
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            disabled={!canSave || isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground text-sm">
        Click on the map to add polygon points (minimum 3).
      </p>

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

export default UpdateAreaForm;
