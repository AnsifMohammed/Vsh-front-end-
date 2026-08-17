import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import ContactPage from "../Pages/ContactPage";
import AppointmentPage from "../Pages/AppointmentPage";
import BlogPage from "../Pages/Blog";
import DoctorPage from "../Pages/DoctorsPage";
import IVFPage from "../Pages/ServicePage/IVF&Fertility";
import DandrologyPage from "../Pages/ServicePage/Dandrology";
import GynecologyPage from "../Pages/ServicePage/Gynecology";
import LaparoscopyPage from "../Pages/ServicePage/Laparoscopy";
import ObstetricPage from "../Pages/ServicePage/Obstetrics";
import ParentalCarePage from "../Pages/ServicePage/ParentalCare";
import UltraSonographyPage from "../Pages/ServicePage/Ultrasonography";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import ForgotPassword from "../Pages/Auth/Forgotpassword";
import ResetPassword from "../Pages/Auth/Resetpassword";
import AdminDashboard from "../Pages/AdminDashboard";

// Protected Route component for admin
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Protected Route component for authenticated users
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🏠 Landing Page */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 🔐 Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />

      {/* 👤 User Routes - Publicly accessible */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/doctors" element={<DoctorPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/Ivf&Fertility" element={<IVFPage />} />
      <Route path="/andrology" element={<DandrologyPage />} />
      <Route path="/gynecology" element={<GynecologyPage />} />
      <Route path="/laparoscopy" element={<LaparoscopyPage />} />
      <Route path="/obstetrics" element={<ObstetricPage />} />
      <Route path="/parentalcare" element={<ParentalCarePage />} />
      <Route path="/ultrasonography" element={<UltraSonographyPage />} />

      {/* 🔧 Admin Routes - Protected */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}