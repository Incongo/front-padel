// src/pages/Register/Register.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await register(nombre, dni, email, password);
            setSuccess("Registro completado. Ahora puedes iniciar sesión.");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2>Crear cuenta</h2>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <label>Nombre</label>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <label>DNI</label>
                <input
                    type="text"
                    placeholder="12345678A"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    required
                />

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
                    {loading ? "Registrando..." : "Registrarse"}
                </button>

                <p className={styles.loginText}>
                    ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
                </p>
            </form>
        </div>
    );
}

export default Register;
