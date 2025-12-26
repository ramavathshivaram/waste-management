import { Navigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

const ProtectedRoute = ({ children, role }) => {
  const user = useUserStore((s) => s.user);
  console.log("pro", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
