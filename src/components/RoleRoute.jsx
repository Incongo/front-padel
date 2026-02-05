import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function RoleRoute({ children, role }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;

    if (!user) return <Navigate to="/login" replace />;

    if (user.rol !== role) return <Navigate to="/" replace />;

    return children;
}

export default RoleRoute;
