import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { upload } from "../../utils/config";

const EditProfile = () => {
  const dispath = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }
  }, [user])


  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>Atualize seu perfil</h1>
      {user && (
        <>
          {(user.profileImage || previewImage) && (
            <img src={previewImage ? URL.createObjectURL(previewImage) : `${upload}/users/${user.profileImage}`} alt={user.name} />
          )}
          <form>
            <label>
              <span>Nome:</span>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              <span>Email:</span>
              <input type="text" value={email} disabled />
            </label>
            <label>
              <span>Área de atuação:</span>
              <input type="text" value={bio} onChange={e => setBio(e.target.value)} />
            </label>
            <label>
              <span>Bio:</span>
              <textarea value={bio} onChange={e => setBio(e.target.value)}></textarea>
            </label>
            <input type="submit" value="Atualizar" />
          </form>
        </>
      )}

    </div>
  )
}

export default EditProfile;