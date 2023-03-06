import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUsers } from '../../slices/userSlice';
import { AppDispatch, RootState } from '../../store';
import { upload } from '../../utils/config';
import styles from './Profiles.module.css';

const Profiles = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>();
    const { loading, users } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.profiles}>
            {users && users.map(user => (
                <div key={user._id} className={styles.profileItem} onClick={() => navigate(`/profile/${user._id}`)}>
                    <img src={`${upload}/users/${user.profileImage}`} alt="" />
                    <div>
                        <p>{user.area}</p>
                        <h2>{user.name}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Profiles