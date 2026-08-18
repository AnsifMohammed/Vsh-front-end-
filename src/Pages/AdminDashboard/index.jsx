import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import BlogManagement from "./components/BlogManagement";
import DoctorManagement from "./components/DoctorManagement";
import { toast } from "../../Components/Common/ToastProvider";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | appointments | blogs
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === "appointments") {
      fetchAppointments();
    }
  }, [activeTab, statusFilter]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, appointmentsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/appointments?limit=10"),
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.data.stats);
        setRecentAppointments(statsRes.data.data.recentAppointments || []);
      }

      if (appointmentsRes.data.success) {
        setAppointments(appointmentsRes.data.data);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const url =
        statusFilter === "all"
          ? "/admin/appointments"
          : `/admin/appointments?status=${statusFilter}`;
      const res = await api.get(url);
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      setUpdating(true);
      const response = await api.put(`/admin/appointments/${id}`, { status });
      if (response.data.success) {
        toast.success(`Appointment status updated to ${status}`);
        // Refresh data
        fetchAppointments();
        fetchDashboardData();
      }
    } catch (err) {
      toast.error("Failed to update appointment status");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const deleteAppointment = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      setUpdating(true);
      const response = await api.delete(`/admin/appointments/${id}`);
      if (response.data.success) {
        toast.success("Appointment deleted successfully");
        fetchAppointments();
        fetchDashboardData();
      }
    } catch (err) {
      toast.error("Failed to delete appointment");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getUTCDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Admin Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "overview"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "appointments"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Manage Appointments
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "blogs"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Manage Blogs
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "doctors"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Manage Doctors
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Total Appointments
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats?.totalAppointments || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Today's Appointments
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats?.todayAppointments || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Upcoming (7 days)
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats?.upcomingAppointments || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats?.totalUsers || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-rose-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Appointments
                </h2>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Patient
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Specialty
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Date & Time
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Phone
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((apt) => (
                      <tr
                        key={apt._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-800">
                            {apt.fullName}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {apt.specialty}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-800">
                            {formatDate(apt.preferredDate)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {apt.preferredTime}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {apt.phoneNumber}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              apt.status,
                            )}`}
                          >
                            {apt.status || "pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "appointments" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                All Appointments
              </h2>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Patient
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Specialty
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Doctor
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Date & Time
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr
                      key={apt._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">
                          {apt.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {apt.emailAddress}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {apt.specialty}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {apt.preferredDoctor || "Any"}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-800">
                          {formatDate(apt.preferredDate)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {apt.preferredTime}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {apt.phoneNumber}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            apt.status,
                          )}`}
                        >
                          {apt.status || "pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {apt.status !== "confirmed" && apt.status !== "completed" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(apt._id, "confirmed")
                              }
                              disabled={updating}
                              className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >
                              Confirm
                            </button>
                          )}
                          {apt.status !== "completed" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(apt._id, "completed")
                              }
                              disabled={updating}
                              className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >
                              Complete
                            </button>
                          )}
                          {apt.status !== "cancelled" && (
                            <button
                              onClick={() =>
                                updateAppointmentStatus(apt._id, "cancelled")
                              }
                              disabled={updating}
                              className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => deleteAppointment(apt._id)}
                            disabled={updating}
                            className="text-xs bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "blogs" && <BlogManagement />}
        {activeTab === "doctors" && <DoctorManagement />}
      </main>
    </div>
  );
};

export default AdminDashboard;
