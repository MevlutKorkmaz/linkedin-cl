import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import Messages from "../pages/Messages";
import ConnectionRequest from "../pages/ConnectionRequest";
import AddEducation from "../pages/AddEducation";
import AddExperience from "../pages/AddExperience";
import Search from "../pages/Search";
import PublicFeed from "../pages/PublicFeed";
import AdminPanel from "../pages/AdminPanel";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import Connections from "../pages/Connections"; // ✅ NEW IMPORT

// Route guards
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedCompanyRoute from "./ProtectedCompanyRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/feed/public" element={<PublicFeed />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/connect" element={<ProtectedRoute><ConnectionRequest /></ProtectedRoute>} />
      <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} /> {/* ✅ NEW ROUTE */}
      <Route path="/add-education" element={<ProtectedRoute><AddEducation /></ProtectedRoute>} />
      <Route path="/add-experience" element={<ProtectedRoute><AddExperience /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />

      {/* Admin-Only */}
      <Route path="/admin" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />

      {/* Company-Only */}
      <Route path="/jobs/create" element={<ProtectedCompanyRoute><div>Post Job Page</div></ProtectedCompanyRoute>} />

      {/* Catch-All */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
