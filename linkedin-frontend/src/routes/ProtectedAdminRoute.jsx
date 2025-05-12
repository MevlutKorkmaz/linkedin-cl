import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const role = localStorage.getItem("role");
  return role === "ADMIN" ? children : <Navigate to="/" replace />;
}
