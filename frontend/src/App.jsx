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

        {/* USUARIO CON LAYOUT */}
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

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <RoleRoute role="admin">
              <AdminDashboard />
            </RoleRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
