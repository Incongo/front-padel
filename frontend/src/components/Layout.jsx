import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.links}>
                        <Link to="/user" className={pathname === "/user" ? styles.active : ""}>Inicio</Link>
                        <Link to="/user/reservas" className={pathname === "/user/reservas" ? styles.active : ""}>Reservar</Link>
                        <Link to="/user/mis-reservas" className={pathname === "/user/mis-reservas" ? styles.active : ""}>Mis reservas</Link>
                    </div>

                    <div className={styles.userBox}>
                        <span className={styles.userName}>{user?.nombre}</span>
                        <button className={styles.logoutBtn} onClick={handleLogout}>Salir</button>
                    </div>
                </nav>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} PadelApp · Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export default Layout;
