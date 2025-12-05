import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenRoutes from "./pages/citizen/CitizenRoutes";
import CollectorRoutes from "./pages/collector/CollectorRoutes";
import CentreRoutes from "./pages/centre/CentreRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { toast } from "sonner";

function App() {
  toast.success("success");
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Citizen Routes */}
        <Route
          path="/citizen/*"
          element={
            <ProtectedRoute role="citizen">
              <CitizenRoutes />
            </ProtectedRoute>
          }
        />

        {/* Collector Routes */}
        <Route
          path="/collector/*"
          element={
            <ProtectedRoute role="collector">
              <CollectorRoutes />
            </ProtectedRoute>
          }
        />

        {/* Centre Routes */}
        <Route
          path="/centre/*"
          element={
            <ProtectedRoute role="centre">
              <CentreRoutes />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
