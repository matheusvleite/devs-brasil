import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";
import { useState } from 'react';

const Navbar = () => {
    const [theme, setTheme] = useState(false);

    const handleTheme = () => {
        const body = document.querySelector('body');
        let currentTheme = body?.getAttribute('data-theme')!;

        if(currentTheme === 'light') {
            currentTheme = 'dark';
            body?.setAttribute('data-theme', currentTheme)
            setTheme(true)
            return
        }

        body?.setAttribute('data-theme', 'light')
        setTheme(false)
    }

    return (
        <header>
            <nav className={styles.navbar}>
                <Link to='/' className={styles.logo}>Devs Brasil</Link>
                <ul>
                    <li><NavLink to="/">Início</NavLink></li>
                    <li><NavLink to="/login">Entrar</NavLink></li>
                    <li><NavLink to="/signup">Cadastre-se</NavLink></li>
                    <li>{theme ? <BsLightbulbOffFill onClick={handleTheme}/> : <BsLightbulbFill onClick={handleTheme}/> }</li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;