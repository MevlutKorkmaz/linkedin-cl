import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import ForgotPassword from "../pages/ForgotPassword";
import PublicFeed from "../pages/PublicFeed";
import NotFound from "../pages/NotFound";

// Shared protected pages
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import Messages from "../pages/Messages";
import Search from "../pages/Search";
import AddEducation from "../pages/AddEducation";
import AddExperience from "../pages/AddExperience";
import ConnectionRequest from "../pages/ConnectionRequest";
import Connections from "../pages/Connections";
import JobList from "../pages/JobList";
import CompanyList from "../pages/CompanyList";
import CompanyJobs from "../pages/CompanyJobs";

// Company pages
import PostJob from "../pages/PostJob";
import CompanyProfile from "../pages/CompanyProfile";

// Admin page
import AdminPanel from "../pages/AdminPanel";

// Route guards
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedCompanyRoute from "./ProtectedCompanyRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/feed/public" element={<PublicFeed />} />

      {/* 🔒 Authenticated User Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/add-education" element={<ProtectedRoute><AddEducation /></ProtectedRoute>} />
      <Route path="/add-experience" element={<ProtectedRoute><AddExperience /></ProtectedRoute>} />
      <Route path="/connect" element={<ProtectedRoute><ConnectionRequest /></ProtectedRoute>} />
      <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
      <Route path="/companies" element={<ProtectedRoute><CompanyList /></ProtectedRoute>} />
      <Route path="/company/:companyId/jobs" element={<ProtectedRoute><CompanyJobs /></ProtectedRoute>} />

      {/* 🏢 Company-Only Routes */}
      <Route path="/jobs/create" element={<ProtectedCompanyRoute><PostJob /></ProtectedCompanyRoute>} />
      <Route path="/company/profile" element={<ProtectedCompanyRoute><CompanyProfile /></ProtectedCompanyRoute>} />

      {/* 🛠 Admin-Only Route */}
      <Route path="/admin" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />

      {/* ❌ Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
