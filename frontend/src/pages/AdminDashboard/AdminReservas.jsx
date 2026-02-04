import { useEffect, useState } from "react";
import { getReservas } from "./api";

function AdminReservas() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        cargarReservas();
    }, []);

    async function cargarReservas() {
        const data = await getReservas();
        setReservas(data);
    }

    return (
        <div>
            <h1>Reservas del sistema</h1>

            {reservas.length === 0 && <p>No hay reservas registradas.</p>}

            {reservas.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Pista</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((r) => (
                            <tr key={r.id}>
                                <td>{r.usuario}</td>
                                <td>{r.pista}</td>
                                <td>{r.fecha}</td>
                                <td>{r.hora}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminReservas;
