import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";
import { useState } from 'react';
import {useAuth} from '../../hooks/useAuth';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../slices/authSlice';
import { AppDispatch } from '../../store';

const Navbar = () => {
    const [theme, setTheme] = useState(false);

    const {auth} = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    }

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
                <Link to='/' className='logo'>Devs Brasil</Link>
                <ul>
                    <li><NavLink to="/">Início</NavLink></li>
                    {auth ? (
                        <>
                        <li><NavLink to="/profile">Perfil</NavLink></li>
                        <li><NavLink to="/editprofile">Editar Perfil</NavLink></li>
                        <li><span onClick={handleLogout} className={styles.logout}>Sair</span></li>
                        </>
                    ) : (
                    <>
                        <li><NavLink to="/login">Entrar</NavLink></li>
                        <li><NavLink to="/signup">Cadastre-se</NavLink></li>
                    </>
                    )}
                    <li>{theme ? <BsLightbulbOffFill onClick={handleTheme}/> : <BsLightbulbFill onClick={handleTheme}/> }</li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;