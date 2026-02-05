import { Link, Outlet } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
    return (
        <div className={styles.layout}>

            <aside className={styles.sidebar}>
                <h2>Admin</h2>
                <nav>
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/usuarios">Usuarios</Link>
                    <Link to="/admin/pistas">Pistas</Link>
                    <Link to="/admin/reservas">Reservas</Link>
                </nav>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>

        </div>
    );
}

export default AdminDashboard;
