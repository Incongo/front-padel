import { useEffect, useState, useRef } from "react";
import styles from "./Reservas.module.css";
import {
    getPistasRequest,
    getHorariosRequest,
    getDisponibilidadRequest,
    createReservaRequest,
} from "../../api/apiClient";

function Reservas() {
    const [pistas, setPistas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [fecha, setFecha] = useState(() => {
        const hoy = new Date();
        return hoy.toISOString().split("T")[0]; // YYYY-MM-DD
    });
    const [franja, setFranja] = useState("00:00-23:59");
    const [disponibilidad, setDisponibilidad] = useState({});

    const [pistaSeleccionada, setPistaSeleccionada] = useState(null);
    const [slotsSeleccionados, setSlotsSeleccionados] = useState([]);
    const dateInputRef = useRef(null);

    useEffect(() => {
        getPistasRequest().then(setPistas);
        getHorariosRequest().then(setHorarios);
    }, []);

    useEffect(() => {
        if (!fecha) return;
        getDisponibilidadRequest(fecha).then((data) => {
            setDisponibilidad(data.disponibilidad);
            setPistaSeleccionada(null);
            setSlotsSeleccionados([]);
        });
    }, [fecha]);

    function formatearFechaCorta(isoDate) {
        if (!isoDate) return "";
        const d = new Date(isoDate);
        return d.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
        });
    }

    function filtrarPorFranja(lista) {
        const [inicio, fin] = franja.split("-");

        const hoy = new Date().toISOString().split("T")[0];
        const esHoy = fecha === hoy;

        const horaActual = new Date().getHours();

        return lista.filter((h) => {
            const horaSlot = parseInt(h.franja.split(":")[0]);

            // Filtrar por franja seleccionada
            const dentroFranja = h.franja >= inicio && h.franja <= fin;

            if (!dentroFranja) return false;

            // Si es hoy, ocultar horas pasadas
            if (esHoy && horaSlot < horaActual) return false;

            return true;
        });
    }


    function toggleSlot(hora, pista) {
        if (!pistaSeleccionada || pistaSeleccionada.id !== pista.id) {
            setPistaSeleccionada(pista);
            setSlotsSeleccionados([hora.id]);
            return;
        }

        const ids = [...slotsSeleccionados];

        if (ids.length === 0) {
            setSlotsSeleccionados([hora.id]);
            return;
        }

        const sorted = [...ids].sort((a, b) => a - b);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];

        if (hora.id === min - 1 || hora.id === max + 1) {
            setSlotsSeleccionados([...ids, hora.id]);
        } else {
            setSlotsSeleccionados([hora.id]);
        }
    }

    async function confirmarReserva() {
        if (!pistaSeleccionada || slotsSeleccionados.length === 0) return;

        try {
            await createReservaRequest(
                pistaSeleccionada.id,      // pista_id
                fecha,                     // fecha
                slotsSeleccionados         // horarios
            );

            alert("Reserva realizada con éxito");

            setSlotsSeleccionados([]);
            setPistaSeleccionada(null);

            window.location.href = "/user/mis-reservas";

        } catch (err) {
            alert("Error al reservar: " + err.message);
        }
    }


    return (
        <div className={styles.layout}>

            {/* CINTA SUPERIOR */}
            <div className={styles.filtros}>
                <button
                    type="button"
                    className={styles.fechaPill}
                    onClick={() => dateInputRef.current?.showPicker?.()}
                >
                    <span>{formatearFechaCorta(fecha)}</span>
                </button>

                <input
                    ref={dateInputRef}
                    type="date"
                    className={styles.fechaHidden}
                    value={fecha}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setFecha(e.target.value)}
                />


                <select
                    className={styles.franjaSelect}
                    value={franja}
                    onChange={(e) => setFranja(e.target.value)}
                >
                    <option value="00:00-23:59">00:00 - 23:59</option>
                    <option value="08:00-12:00">08:00 - 12:00</option>
                    <option value="12:00-16:00">12:00 - 16:00</option>
                    <option value="16:00-20:00">16:00 - 20:00</option>
                    <option value="20:00-23:59">20:00 - 23:59</option>
                </select>
            </div>

            {/* LISTADO DE PISTAS */}
            <div className={styles.listaPistas}>
                {pistas.map((pista) => {
                    const libres = disponibilidad[pista.nombre] || [];
                    const horariosFiltrados = filtrarPorFranja(libres);

                    return (
                        <div key={pista.id} className={styles.pistaCard}>
                            <img
                                src={`/src/assets/1.jpg`}
                                className={styles.pistaImg}
                                alt={pista.nombre}
                            />

                            <div className={styles.pistaInfo}>
                                <h3>{pista.nombre}</h3>
                                <p>{pista.precio_base} € / hora</p>
                            </div>

                            {horariosFiltrados.length > 0 ? (
                                <div className={styles.carrusel}>
                                    {horariosFiltrados.map((h) => (
                                        <button
                                            key={h.id}
                                            className={`${styles.horaItem} ${pistaSeleccionada?.id === pista.id &&
                                                slotsSeleccionados.includes(h.id)
                                                ? styles.horaSeleccionada
                                                : ""
                                                }`}
                                            onClick={() => toggleSlot(h, pista)}
                                        >
                                            {h.franja}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className={styles.noDisp}>No hay disponibilidad</p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* BARRA INFERIOR DE RESERVA */}
            {slotsSeleccionados.length > 0 && pistaSeleccionada && (
                <div className={styles.barraReserva}>
                    <div className={styles.resumenReserva}>
                        <span>
                            {slotsSeleccionados.length * 0.5} h ·{" "}
                            {(pistaSeleccionada.precio_base *
                                (slotsSeleccionados.length * 0.5)).toFixed(2)} €
                        </span>
                    </div>

                    <button
                        className={styles.btnReservar}
                        onClick={confirmarReserva}
                    >
                        Reservar
                    </button>
                </div>
            )}

        </div>
    );
}

export default Reservas;
