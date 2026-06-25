import "./assets/tailwind.css";
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loading from "./components/Loading";

/* Pages */
const Dashboard = lazy(() => import("./pages/Dashboard"));

const Member = lazy(() => import("./pages/Member"));
const AddMember = lazy(() => import("./pages/AddMember"));

const Order = lazy(() => import("./pages/Order"));
const AddOrder = lazy(() => import("./pages/AddOrder"));

const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AdminUsers = lazy(() => import("./pages/AdminUsers")); // <-- Menambahkan halaman CRUD Admin baru kamu

/* Auth */
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/Register")); // <-- SUDAH DIPERBAIKI: Mengarah langsung ke src/pages/Register.jsx
const Forgot = lazy(() => import("./pages/auth/Forgot"));

/* Layout */
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

const Laporan = lazy(() => import("./pages/Laporan"));

/* Protected Route */
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* MAIN */}
        <Route
          element = {
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />

          {/* ADMIN USERS CRUD */}
          <Route path="/admin-users" element={<AdminUsers />} /> {/* <-- Route untuk halaman manajemen user kamu */}

          {/* PATIENTS */}
          <Route path="/Members" element={<Member />} />
          <Route path="/Members/add" element={<AddMember />} />

          {/* ORDERS */}
          <Route path="/Orders" element={<Order />} />
          <Route path="/Orders/add" element={<AddOrder />} />

          {/* Laporan */}
          <Route path="/reports" element={<Laporan />} />

          {/* ERROR */}
          <Route path="/400" element={<ErrorPage code="400" />} />
          <Route path="/401" element={<ErrorPage code="401" />} />
          <Route path="/403" element={<ErrorPage code="403" />} />

          {/* 404 */}
          <Route path="*" element={<ErrorPage code="404" />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;