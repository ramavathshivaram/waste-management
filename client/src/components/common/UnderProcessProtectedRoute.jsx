import React from "react";
import useCollectorStore from "../../stores/collectorStore";
import { useNavigate } from "react-router-dom";

const UnderProcessProtectedRoute = ({ children }) => {
  const collector = useCollectorStore((s) => s.collector);
  const navigate = useNavigate();

  if (collector?.isAdminVerified === false) {
    navigate("/collector/under-process");
  }
  return children;
};

export default UnderProcessProtectedRoute;
