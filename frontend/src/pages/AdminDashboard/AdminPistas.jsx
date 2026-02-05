import { useEffect, useState } from "react";
import { getPistas, crearPista, eliminarPista } from "./api";

function AdminPistas() {
    const [pistas, setPistas] = useState([]);
    const [nueva, setNueva] = useState({
        nombre: "",
        cubierta: false,
        plazas: 4,
        precio_base: 12,
    });
    const [error, setError] = useState("");

    useEffect(() => {
        cargarPistas();
    }, []);

    async function cargarPistas() {
        try {
            const data = await getPistas();
            setPistas(data);
        } catch (err) {
            setError("Error al cargar pistas");
        }
    }

    async function handleCrear(e) {
        e.preventDefault();
        setError("");

        try {
            await crearPista({
                nombre: nueva.nombre,
                cubierta: nueva.cubierta,
                plazas: Number(nueva.plazas),
                precio_base: Number(nueva.precio_base),
            });
            setNueva({ nombre: "", cubierta: false, plazas: 4, precio_base: 12 });
            cargarPistas();
        } catch (err) {
            setError("Error al crear pista");
        }
    }

    async function handleEliminar(id) {
        setError("");
        try {
            await eliminarPista(id);
            cargarPistas();
        } catch (err) {
            setError("Error al eliminar pista");
        }
    }

    return (
        <div>
            <h1>Gestión de pistas</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleCrear} style={{ marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nueva.nombre}
                    onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Plazas"
                    value={nueva.plazas}
                    onChange={(e) => setNueva({ ...nueva, plazas: e.target.value })}
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio base"
                    value={nueva.precio_base}
                    onChange={(e) => setNueva({ ...nueva, precio_base: e.target.value })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={nueva.cubierta}
                        onChange={(e) => setNueva({ ...nueva, cubierta: e.target.checked })}
                    />
                    Cubierta
                </label>
                <button type="submit">Crear pista</button>
            </form>

            {pistas.length === 0 && <p>No hay pistas registradas.</p>}

            {pistas.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cubierta</th>
                            <th>Plazas</th>
                            <th>Precio base</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pistas.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>{p.cubierta ? "Sí" : "No"}</td>
                                <td>{p.plazas}</td>
                                <td>{p.precio_base} €</td>
                                <td>
                                    <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminPistas;
