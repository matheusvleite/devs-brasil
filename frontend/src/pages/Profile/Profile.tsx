import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { userDetails } from "../../slices/userSlice";
import { AppDispatch, RootState } from "../../store";
import { upload } from "../../utils/config";
import styles from './Profile.module.css';

const Profile = () => {

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {

    if (id) dispatch(userDetails(id))

  }, [dispatch, id])


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