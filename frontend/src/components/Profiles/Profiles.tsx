import { useEffect } from 'react';
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUsers, profile, starAnUser } from '../../slices/userSlice';
import { AppDispatch, RootState } from '../../store';
import { upload } from '../../utils/config';
import Loading from '../Loading/Loading';
import styles from './Profiles.module.css';

const Profiles = () => {
    const { auth } = useAuth()
    const dispatch = useDispatch<AppDispatch>();
    const { loading, users, message } = useSelector((state: RootState) => state.user)
    const { user: userAuth } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getUsers())
        dispatch(profile())
    }, [dispatch])

    const handleStar = (id: string) => {
        if (!auth) {
            navigate('/login')
            return
        }

        dispatch(starAnUser(id))
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={styles.profilesContainer}>
            <h2>Perfis criados recentemente no Devs Brasil</h2>
            <div className={styles.profiles}>
                {users && users.map(user => (
                    <article key={user._id} className={styles.profileItem}>
                        <img src={`${upload}/users/${user.profileImage}`} alt="" />
                        <div>
                            <p>{user.area}</p>
                            <h2>{user.name}</h2>
                            <Link to={`/profile/${user._id}/${user.name}`}>Ver mais</Link>
                        </div>
                        {userAuth && user.stars.includes(String(userAuth._id)) ?
                            <BsFillStarFill className={styles.starOn} onClick={() => handleStar(user._id)} /> :
                            <BsFillStarFill className={styles.starOff} title="Dê estrela." onClick={() => handleStar(user._id)} />}
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Profiles