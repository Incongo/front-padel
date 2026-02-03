// src/context/AuthContext.jsx

import { createContext, useState, useEffect, useContext } from "react";
import { loginRequest, registerRequest, getMeRequest } from "../api/apiClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar usuario si hay token guardado
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        getMeRequest()
            .then((data) => {
                const userData = {
                    id: data.id,
                    email: data.email,
                    nombre: data.nombre,
                    rol: data.rol,
                };

                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            })
            .catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    // LOGIN
    async function login(email, password) {
        const data = await loginRequest(email, password);

        const userData = {
            id: data.user.id,
            email: data.user.email,
            nombre: data.user.nombre,
            rol: data.user.rol,
        };

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        return userData;
    }

    // REGISTER
    async function register(nombre, dni, email, password) {
        return await registerRequest(nombre, dni, email, password);
    }

    // LOGOUT
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar el contexto fácilmente
export function useAuth() {
    return useContext(AuthContext);
}
