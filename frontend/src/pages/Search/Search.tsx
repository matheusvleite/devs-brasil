import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { IUser } from "../../interfaces/User";
import { searchUser } from "../../slices/userSlice";
import { AppDispatch, RootState } from "../../store";
import { upload } from "../../utils/config";
import styles from './Search.module.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const dispatch = useDispatch<AppDispatch>();

  const { users, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (query) {
      dispatch(searchUser(query))
    }
  }, [dispatch, query])

  console.log(users)

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.search}>
      <h2>Resultados para: {query}</h2>
      {users && users.map((user) => (
        <div key={user._id} className={styles.searchResults}>
          <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
          <div><p>{user.name} - {user.area}</p>
          <Link to={`/profile/${user._id}`}>Ver mais</Link>
          </div>
        </div>
      ))}
      {users && users.length === 0 && <h2>Não foram encontrados resultados para a sua pesquisa :(</h2>}
    </div>
  )
}

export default Search;