import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CitizenRoutes from "./pages/citizen/CitizenRoutes";
import CollectorRoutes from "./pages/collector/CollectorRoutes";
import CentreRoutes from "./pages/centre/CentreRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PageNotFound from "./components/common/PageNotFound";

function App() {
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

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
