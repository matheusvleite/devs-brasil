import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { userDetails } from "../../slices/userSlice";
import { AppDispatch, RootState } from "../../store";

const Profile = () => {

  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {user, loading} = useSelector((state: RootState) => state.user);

  useEffect(() => {

    if(id) dispatch(userDetails(id))

  }, [dispatch, id])


  if(loading) {
    return <p>Carregando...</p>
  }
  return (
    <div>Profile</div>
  )
}

export default Profile