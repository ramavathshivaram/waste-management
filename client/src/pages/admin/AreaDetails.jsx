import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AreaDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
      <h1>Area Details</h1>
      <div>
        <Button
          onClick={() => {
            navigate(`/admin/area/update?id=${id}`);
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default AreaDetails;
