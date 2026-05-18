import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/User/Home";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// Dashboards
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Dashboard from "./pages/User/Dashboard"; // Contributor
import ViewerDashboard from "./pages/User/ViewerDashboard";

// Resources
import ResourceList from "./pages/User/ResourceList";
import Upload from "./pages/User/UploadResource";

// Optional Navbar (you already have it)
import Navbar from "./components/Navbar";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🏠 HOME */}
        <Route path="/" element={<Home />} />

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

     {/* FORGOT PASSWORD */}
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* RESET PASSWORD */}
    <Route path="/reset/:token" element={<ResetPassword />} />

        {/* 👑 ADMIN */}
        <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["contributor"]}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/viewer"
  element={
    <ProtectedRoute allowedRoles={["viewer"]}>
      <ViewerDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/upload"
  element={
    <ProtectedRoute allowedRoles={["contributor", "admin"]}>
      <Upload />
    </ProtectedRoute>
  }
/>

<Route
  path="/resources"
  element={
    <ProtectedRoute allowedRoles={["viewer", "contributor", "admin"]}>
      <ResourceList />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;