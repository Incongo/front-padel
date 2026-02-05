import { useEffect, useState } from "react";
import { getUsuarios, crearUsuario, eliminarUsuario } from "./api";

function AdminUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevo, setNuevo] = useState({ nombre: "", email: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (err) {
            setError("Error al cargar usuarios");
        }
    }

    async function handleCrear(e) {
        e.preventDefault();
        setError("");

        try {
            await crearUsuario(nuevo);
            setNuevo({ nombre: "", email: "" });
            cargarUsuarios();
        } catch (err) {
            setError("Error al crear usuario");
        }
    }

    async function handleEliminar(id) {
        setError("");
        try {
            await eliminarUsuario(id);
            cargarUsuarios();
        } catch (err) {
            setError("Error al eliminar usuario");
        }
    }

    return (
        <div>
            <h1>Gestión de usuarios</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleCrear} style={{ marginBottom: "20px", display: "flex", gap: "8px" }}>
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

            {usuarios.length === 0 && <p>No hay usuarios registrados.</p>}

            {usuarios.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre || u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <button onClick={() => handleEliminar(u.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminUsers;
