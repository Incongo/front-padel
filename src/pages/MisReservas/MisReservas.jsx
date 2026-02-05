import { useEffect, useState } from "react";
import styles from "./MisReservas.module.css";
import { getMisReservasRequest, cancelarReservaRequest } from "../../api/apiClient";

function MisReservas() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMisReservasRequest()
            .then((data) => {
                setReservas(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    async function cancelarReserva(id) {
        if (!confirm("¿Seguro que quieres cancelar esta reserva?")) return;

        try {
            await cancelarReservaRequest(id);
            setReservas(reservas.filter((r) => r.id !== id));
        } catch (err) {
            alert("Error al cancelar: " + err.message);
        }
    }

    if (loading) {
        return <p className={styles.loading}>Cargando reservas...</p>;
    }

    return (
        <div className={styles.layout}>
            <h2 className={styles.titulo}>Mis reservas</h2>

            {reservas.length === 0 && (
                <p className={styles.noReservas}>No tienes reservas todavía</p>
            )}

            <div className={styles.lista}>
                {reservas.map((r) => (
                    <div key={r.id} className={styles.card}>
                        <div className={styles.info}>
                            <h3>{r.pista}</h3>
                            <p><strong>Fecha:</strong> {r.fecha}</p>
                            <p><strong>Horas:</strong> {r.horarios.join(", ")}</p>
                            <p><strong>Total:</strong> {r.precio_total} €</p>
                        </div>

                        <button
                            className={styles.btnCancelar}
                            onClick={() => cancelarReserva(r.id)}
                        >
                            Cancelar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MisReservas;
