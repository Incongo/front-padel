import { useEffect, useState } from "react";
import { getHorarios, crearHorario, eliminarHorario } from "./api";

function AdminHorarios() {
    const [horarios, setHorarios] = useState([]);
    const [nuevo, setNuevo] = useState({
        franja: "",
        turno: "mañana",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        cargarHorarios();
    }, []);

    async function cargarHorarios() {
        try {
            const data = await getHorarios();
            setHorarios(data);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleCrear(e) {
        e.preventDefault();
        setError("");

        try {
            await crearHorario({
                franja: nuevo.franja,
                turno: nuevo.turno,
            });
            setNuevo({ franja: "", turno: "mañana" });
            cargarHorarios();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleEliminar(id) {
        setError("");
        try {
            await eliminarHorario(id);
            cargarHorarios();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h1>Gestión de horarios</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleCrear} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Franja (ej: 10:00-11:00)"
                    value={nuevo.franja}
                    onChange={(e) => setNuevo({ ...nuevo, franja: e.target.value })}
                />
                <select
                    value={nuevo.turno}
                    onChange={(e) => setNuevo({ ...nuevo, turno: e.target.value })}
                >
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                </select>
                <button type="submit">Crear horario</button>
            </form>

            {horarios.length === 0 && <p>No hay horarios registrados.</p>}

            {horarios.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Franja</th>
                            <th>Turno</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {horarios.map((h) => (
                            <tr key={h.id}>
                                <td>{h.id}</td>
                                <td>{h.franja}</td>
                                <td>{h.turno}</td>
                                <td>
                                    <button onClick={() => handleEliminar(h.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminHorarios;
