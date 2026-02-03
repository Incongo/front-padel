// src/pages/UserDashboard/UserDashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMisReservasRequest } from "../../api/apiClient";
import styles from "./UserDashboard.module.css";

// Función para parsear fechas dd/mm/yyyy
function parseFecha(fechaStr) {
    const [dia, mes, año] = fechaStr.split("/");
    return new Date(`${año}-${mes}-${dia}`);
}

function UserDashboard() {
    const { user } = useAuth();
    const [proximas, setProximas] = useState([]);

    useEffect(() => {
        getMisReservasRequest().then((data) => {

            const futuras = data
                .map(r => ({
                    ...r,
                    fechaObj: parseFecha(r.fecha)
                }))
                .filter(r => r.fechaObj >= new Date())
                .sort((a, b) => a.fechaObj - b.fechaObj)
                .slice(0, 3);

            setProximas(futuras);
        });
    }, []);

    return (
        <div className={styles.layout}>
            <h2 className={styles.titulo}>Hola, {user?.nombre}</h2>
            <p className={styles.subtitulo}>Bienvenido a tu zona de usuario</p>

            {/* ACCESOS RÁPIDOS */}
            <div className={styles.quickActions}>
                <Link to="/user/reservas" className={styles.actionCard}>
                    <h3>Reservar pista</h3>
                    <p>Busca disponibilidad y reserva al instante</p>
                </Link>

                <Link to="/user/mis-reservas" className={styles.actionCard}>
                    <h3>Mis reservas</h3>
                    <p>Consulta o cancela tus reservas</p>
                </Link>
            </div>

            {/* PRÓXIMAS RESERVAS */}
            <div className={styles.section}>
                <h3>Próximas reservas</h3>

                {proximas.length === 0 && (
                    <p className={styles.noData}>No tienes reservas próximas</p>
                )}

                <div className={styles.reservasGrid}>
                    {proximas.map((r) => (
                        <div key={r.id} className={styles.reservaCard}>
                            <h4>{r.pista}</h4>
                            <p><strong>Fecha:</strong> {r.fecha}</p>
                            <p><strong>Horas:</strong> {r.horarios.join(", ")}</p>
                            <p><strong>Total:</strong> {r.precio_total} €</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
