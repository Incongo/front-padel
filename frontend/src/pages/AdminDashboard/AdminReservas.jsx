import { useEffect, useState } from "react";
import { getReservas } from "./api";

function AdminReservas() {
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarReservas();
    }, []);

    async function cargarReservas() {
        try {
            const data = await getReservas();
            setReservas(data);
        } catch (err) {
            setError("Error al cargar reservas");
        }
    }

    if (error) {
        return (
            <div>
                <h1>Reservas del sistema</h1>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Reservas del sistema</h1>

            {reservas.length === 0 && <p>No hay reservas registradas.</p>}

            {reservas.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(reservas[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((r) => (
                            <tr key={r.id || JSON.stringify(r)}>
                                {Object.keys(reservas[0]).map((key) => (
                                    <td key={key}>{String(r[key])}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminReservas;
