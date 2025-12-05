import { Navigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

const ProtectedRoute = ({ children, role }) => {
  const user = useUserStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Redirect to their appropriate dashboard if they have the wrong role
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
