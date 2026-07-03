import "./assets/tailwind.css";
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loading from "./components/Loading";

/* Pages */
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const Member = lazy(() => import("./pages/Member"));
const AddMember = lazy(() => import("./pages/AddMember"));

const Order = lazy(() => import("./pages/Order"));
const AddOrder = lazy(() => import("./pages/AddOrder"));

const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AdminUsers = lazy(() => import("./pages/AdminUsers")); // <-- Menambahkan halaman CRUD Admin baru kamu

/* LANDING PAGE (Public) */
/* Dashboard dipindah ke /dashboard */

/* Auth */
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/Register")); // <-- SUDAH DIPERBAIKI: Mengarah langsung ke src/pages/Register.jsx
const Forgot = lazy(() => import("./pages/auth/Forgot"));

/* Layout */
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

const Laporan = lazy(() => import("./pages/Laporan"));

/* Protected Route - Cuma cek login */
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
};

/* Admin Route - Cek role admin */
const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user.id) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return <Outlet />;
};

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* LANDING PAGE (Public) */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* MAIN - Butuh Login */}
        <Route
          element = {
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* ── Admin Only ── */}
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/reports" element={<Laporan />} />
          </Route>

          {/* ── All Logged In Users (Agen & Admin) ── */}
          <Route path="/Members" element={<Member />} />
          <Route path="/Members/add" element={<AddMember />} />
          <Route path="/Orders" element={<Order />} />
          <Route path="/Orders/add" element={<AddOrder />} />

          {/* ERROR */}
          <Route path="/400" element={<ErrorPage code="400" />} />
          <Route path="/401" element={<ErrorPage code="401" />} />
          <Route path="/403" element={<ErrorPage code="403" />} />
        </Route>

        {/* 404 - Public (di luar ProtectedRoute) */}
        <Route path="*" element={<ErrorPage code="404" />} />

      </Routes>
    </Suspense>
  );
}

export default App;