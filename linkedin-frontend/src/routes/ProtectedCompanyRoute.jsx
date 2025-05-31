import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isCompany } from "../utils/roleUtils";

export default function ProtectedCompanyRoute({ children }) {
  const { role } = useAuth();

  if (!isCompany(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
