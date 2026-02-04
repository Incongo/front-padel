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

                    {/* LOGO IZQUIERDA */}
                    <Link to="/" className={styles.logo}>
                        PadelApp
                    </Link>


                    {/* MENÚ DERECHA */}
                    <div className={styles.userArea}>
                        <span className={styles.userName}>{user?.nombre}</span>

                        <div className={styles.userMenu}>
                            <button className={styles.userButton}>Menú</button>

                            <div className={styles.dropdown}>
                                <p className={styles.dropdownName}>{user?.nombre}</p>
                                <Link to="/user">Inicio</Link>
                                <Link to="/user/reservas">Reservar</Link>
                                <Link to="/user/mis-reservas">Mis reservas</Link>
                                <button className={styles.logoutBtn} onClick={handleLogout}>Salir</button>
                            </div>
                        </div>
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
