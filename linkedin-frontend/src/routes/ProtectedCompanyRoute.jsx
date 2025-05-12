// src/routes/ProtectedCompanyRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isCompany } from "../utils/roleUtils";

const ProtectedCompanyRoute = ({ children }) => {
  const { role } = useAuth();
  return isCompany(role) ? children : <Navigate to="/" replace />;
};

export default ProtectedCompanyRoute;
