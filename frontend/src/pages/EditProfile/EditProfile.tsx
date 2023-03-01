import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
import { AppDispatch, RootState } from "../../store";
import { upload } from "../../utils/config";
import styles from './EditProfile.module.css';

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, message } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [area, setArea] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    dispatch(profile())
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
      setArea(user.area)
    }
  }, [user])

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      bio,
      profileImage,
      area
    }

    if (profileImage) {
      data.profileImage = profileImage;
    }

    if (bio) {
      data.bio = bio;
    }

    if(area) {
      data.area = area
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("bio", bio)
    formData.append("area", area)
    formData.append("profileImage", profileImage)


    dispatch(updateProfile(formData))

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);

  }

  const handleFile = (e: any) => {
    const image = e.target.files[0]
    setPreviewImage(image)
    setProfileImage(image)
  }


  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.editProfile}>
      <h1>Atualize seu perfil</h1>
      {user && (
        <>
          {(user.profileImage || previewImage) && (
            <img src={previewImage ? URL.createObjectURL(previewImage) : `${upload}/users/${user.profileImage}`} alt={user.name} />
          )}
          <form onSubmit={handleEdit}>
            <label>
              <span>Nome:</span>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              <span>Email:</span>
              <input type="text" value={email} disabled />
            </label>
            <label>
              <span>Foto:</span>
              <input type="file" onChange={handleFile} />
            </label>
            <label>
              <span>Área de atuação:</span>
              <input type="text" value={area} onChange={e => setArea(e.target.value)} />
            </label>
            <label>
              <span>Bio:</span>
              <textarea value={bio} onChange={e => setBio(e.target.value)}></textarea>
            </label>
            <input type="submit" value="Atualizar" />
          </form>
          {message && <Message type="success" message={message} />}
        </>
      )}
    </div>
  )
}

export default EditProfile;