import { useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { starAnUser, userDetails } from "../../slices/userSlice";
import { AppDispatch, RootState } from "../../store";
import { upload } from "../../utils/config";
import styles from './Profile.module.css';

const Profile = () => {

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useAuth();

  const navigate = useNavigate();

  const { user, loading } = useSelector((state: RootState) => state.user);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {

    if (id) dispatch(userDetails(id))

  }, [dispatch, id])

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
    <div className={styles.profile}>
      {user && (
        <>
          <div className={styles.user}>
            <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
            <div className={styles.infos}>
              <h1>{user.name}</h1>
              <span>{user.email}</span>
              <p>{user.area}</p>
              <div className={styles.star}>
                <span>{user.stars && user.stars.length}</span><BsFillStarFill />
                {userAuth && user.stars.includes(String(userAuth._id)) ? '' : <button onClick={() => handleStar(user._id)}>Dá estrela?</button>}
              </div>
            </div>
          </div>
          <div className={styles.bio}>
            {user.bio ? (<p>{user.bio}</p>) : (<p>Esse usuário não adicionou descrição.</p>)}
          </div>
        </>
      )}
    </div>
  )
}

export default Profile