import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import RoleRoute from "./components/RoleRoute";
import Reservas from "./pages/Reservas/Reservas";
import MisReservas from "./pages/MisReservas/MisReservas";
import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home/Home";

import AdminHome from "./pages/AdminDashboard/AdminHome";
import AdminUsers from "./pages/AdminDashboard/AdminUsers";
import AdminPistas from "./pages/AdminDashboard/AdminPistas";
import AdminReservas from "./pages/AdminDashboard/AdminReservas";
import AdminHorarios from "./pages/AdminDashboard/AdminHorarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME PÚBLICA */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        {/* PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USUARIO */}
        <Route
          path="/user"
          element={
            <RoleRoute role="user">
              <Layout />
            </RoleRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="mis-reservas" element={<MisReservas />} />
        </Route>

        {/* ADMIN CON LAYOUT Y RUTAS INTERNAS */}
        <Route
          path="/admin"
          element={
            <RoleRoute role="admin">
              <AdminDashboard />
            </RoleRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="usuarios" element={<AdminUsers />} />
          <Route path="pistas" element={<AdminPistas />} />
          <Route path="reservas" element={<AdminReservas />} />
          <Route path="horarios" element={<AdminHorarios />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
