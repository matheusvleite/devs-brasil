import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import { register, reset } from '../../slices/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../interfaces/User';



const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const {loading, error} = useSelector((state: RootState) => state.auth)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password != confirmPassword) {
            alert('As senhas precisam ser iguais!')
            return
        }

        const data = {
            name,
            email,
            password,
            confirmPassword
        }

        dispatch(register(data))

    }

    return (
        <div className={styles.signup}>
            <h2 className='subtitle'>Cadastre-se e faça parte da <span className='logo'>Devs Brasil</span>.</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Seu nome:</span>
                    <input type="text" placeholder='Digite seu nome e sobrenome' value={name} onChange={e => setName(e.target.value)}/>
                </label>
                <label>
                    <span>Seu e-mail:</span>
                    <input type="email" placeholder='Digite seu e-mail' value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <span>Senha:</span>
                    <input type="password" placeholder='Digite sua melhor senha' value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>
                    <span>Confirme a senha:</span>
                    <input type="password" placeholder='Confirme sua senha' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                </label>
                <input type="submit" value="Cadastrar" />
            </form>
            <div className='bottom'>
            <p>Ja tem conta? <Link to='/login'>Clique aqui.</Link></p>
            </div>
        </div>
    )
}

export default SignUp