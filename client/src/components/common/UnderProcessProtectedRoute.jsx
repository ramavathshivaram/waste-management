import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore.js";

const UnderProcessProtectedRoute = ({ data, children }) => {
  const navigate = useNavigate();

  if (data?.isSubmitted === false) {
    navigate(`/${data.role}/update`);
  }
  return children;
};

export default UnderProcessProtectedRoute;
