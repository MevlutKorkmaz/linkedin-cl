import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { role } = useAuth();

  if (role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
