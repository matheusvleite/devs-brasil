import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <header>
            <nav className={styles.navbar}>
                <span>Devs Brasil</span>
                <ul>
                    <li><NavLink to="/">Início</NavLink></li>
                    <li><NavLink to="/login">Entrar</NavLink></li>
                    <li><NavLink to="/signup">Cadastre-se</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar