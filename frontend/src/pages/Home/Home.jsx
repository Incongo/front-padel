import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Home.module.css";

function Home() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Bienvenido, {user?.nombre}</h1>

                <p>Has iniciado sesión correctamente.</p>

                <button className={styles.logoutBtn} onClick={logout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default Home;
