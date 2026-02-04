import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.home}>

            <section className={styles.hero}>
                <h1>Reserva tu pista de pádel en segundos</h1>
                <p>Rápido, intuitivo y disponible 24/7</p>
                <Link to="/login" className={styles.ctaBtn}>Reservar ahora</Link>
            </section>

            <div className={styles.blockWithBackground}>

                <section className={styles.steps}>
                    <h2>¿Cómo funciona?</h2>
                    <div className={styles.stepsGrid}>
                        <div className={styles.stepCard}>
                            <h3>1. Elige fecha y pista</h3>
                            <p>Consulta disponibilidad en tiempo real.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <h3>2. Selecciona tu horario</h3>
                            <p>Elige los tramos que quieras jugar.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <h3>3. Confirma tu reserva</h3>
                            <p>Pago en pista o según tu sistema.</p>
                        </div>
                    </div>
                </section>

                <section className={styles.pistas}>
                    <h2>Nuestras pistas</h2>
                    <div className={styles.pistasGrid}>
                        <div className={styles.pistaCard}>
                            <img src="/src/assets/1.jpg" alt="Pista 1" />
                            <h3>Pista 1</h3>
                            <p>Césped artificial</p>
                        </div>
                        <div className={styles.pistaCard}>
                            <img src="/src/assets/1.jpg" alt="Pista 2" />
                            <h3>Pista 2</h3>
                            <p>Techada</p>
                        </div>
                        <div className={styles.pistaCard}>
                            <img src="/src/assets/1.jpg" alt="Pista 3" />
                            <h3>Pista 3</h3>
                            <p>Exterior premium</p>
                        </div>
                    </div>
                </section>

            </div>

            <section className={styles.finalCTA}>
                <h2>¿Listo para jugar?</h2>
                <Link to="/login" className={styles.ctaBtn}>Iniciar sesión</Link>
            </section>

        </div>
    );
}

export default Home;
