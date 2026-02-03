// src/pages/Login/Login.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const loggedUser = await login(email, password);

            if (loggedUser.rol === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>

                {error && <p className={styles.error}>{error}</p>}

                <label>Email</label>
                <input
                    type="email"
                    placeholder="tuemail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Entrar"}
                </button>

                <p className={styles.registerText}>
                    ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
