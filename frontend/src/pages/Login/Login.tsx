import { FormEvent, useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email,
      password
    }


  }

  return (
    <div className={styles.login}>
      <h2 className='subtitle'>Entre na plataforma <span className='logo'>Devs Brasil</span>.</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>E-mail:</span>
            <input type="email" placeholder='Seu e-mail' value={email} onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
          </label>
          <input type="submit" value="Entrar" />
        </form>
    </div>
  )
}

export default Login