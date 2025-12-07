import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore.js";

const UnderProcessProtectedRoute = ({ data, children }) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  if (data?.isAdminVerified === false) {
    navigate(`/${user.role}/under-process`);
  }
  return children;
};

export default UnderProcessProtectedRoute;
