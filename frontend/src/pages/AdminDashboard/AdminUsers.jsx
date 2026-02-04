import { useEffect, useState } from "react";
import { getUsuarios, crearUsuario, eliminarUsuario } from "./api";

function AdminUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevo, setNuevo] = useState({ nombre: "", email: "" });

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
        const data = await getUsuarios();
        setUsuarios(data);
    }

    async function handleCrear(e) {
        e.preventDefault();
        await crearUsuario(nuevo);
        setNuevo({ nombre: "", email: "" });
        cargarUsuarios();
    }

    async function handleEliminar(id) {
        await eliminarUsuario(id);
        cargarUsuarios();
    }

    return (
        <div>
            <h1>Gestión de usuarios</h1>

            <form onSubmit={handleCrear}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nuevo.nombre}
                    onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={nuevo.email}
                    onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
                />
                <button type="submit">Crear usuario</button>
            </form>

            <ul>
                {usuarios.map((u) => (
                    <li key={u.id}>
                        {u.nombre} — {u.email}
                        <button onClick={() => handleEliminar(u.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminUsers;
