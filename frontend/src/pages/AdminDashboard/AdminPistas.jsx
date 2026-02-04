import { useEffect, useState } from "react";
import { getPistas, crearPista, eliminarPista } from "./api";

function AdminPistas() {
    const [pistas, setPistas] = useState([]);
    const [nueva, setNueva] = useState({ nombre: "", tipo: "" });

    useEffect(() => {
        cargarPistas();
    }, []);

    async function cargarPistas() {
        const data = await getPistas();
        setPistas(data);
    }

    async function handleCrear(e) {
        e.preventDefault();
        await crearPista(nueva);
        setNueva({ nombre: "", tipo: "" });
        cargarPistas();
    }

    async function handleEliminar(id) {
        await eliminarPista(id);
        cargarPistas();
    }

    return (
        <div>
            <h1>Gestión de pistas</h1>

            <form onSubmit={handleCrear}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nueva.nombre}
                    onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tipo"
                    value={nueva.tipo}
                    onChange={(e) => setNueva({ ...nueva, tipo: e.target.value })}
                />
                <button type="submit">Crear pista</button>
            </form>

            <ul>
                {pistas.map((p) => (
                    <li key={p.id}>
                        {p.nombre} — {p.tipo}
                        <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPistas;
