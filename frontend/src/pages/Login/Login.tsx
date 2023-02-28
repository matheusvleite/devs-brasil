import { FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { login, reset } from '../../slices/authSlice';
import Message from '../../components/Message/Message';
import { resetComponentMessage } from '../../hooks/useResetMessage';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, message} = useSelector((state: RootState) => state.auth)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email,
      password
    }

    dispatch(login(data))

    resetComponentMessage(dispatch)

  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

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
          {loading && <input type="submit" value="Carregando..." disabled/> }
          {!loading && <input type="submit" value="Entrar" /> }
        </form>
        {error && <Message type='error' message={message} />}
    </div>
  )
}

export default Login