import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
    const { user } = useAuth();

    // Si ya hay usuario → redirigir al dashboard
    if (user) {
        return <Navigate to="/user" replace />;
    }

    // Si no hay usuario → mostrar la página pública
    return children;
}

export default PublicRoute;
