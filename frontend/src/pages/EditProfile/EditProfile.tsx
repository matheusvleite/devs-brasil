import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
import { AppDispatch, RootState } from "../../store";
import { areas } from "../../utils/area";
import { upload } from "../../utils/config";
import styles from './EditProfile.module.css';

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, message } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [area, setArea] = useState('');
  const [profileImage, setProfileImage] = useState<File>();
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState<File>();

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

    const formData = new FormData()
    formData.append("name", name)

    if (profileImage) {
      data.profileImage = profileImage;
      formData.append("profileImage", profileImage)
    }

    if (area) {
      data.area = area
      formData.append("area", area)
    }

    if (bio) {
      data.bio = bio;
      formData.append("bio", bio)
    }

    dispatch(updateProfile(formData))

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);

  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const image = e.target.files[0]
      setPreviewImage(image)
      setProfileImage(image)
    }
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
              <input type="text" value={name || ''} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              <span>Email:</span>
              <input type="text" value={email || ''} disabled />
            </label>
            <label>
              <span>Foto:</span>
              <input type="file" onChange={handleFile} />
            </label>
            <label>
              <span>Área de atuação:</span>
              <select name="area" value={area} onChange={e => setArea(e.target.value)}>
                <option value="">Selecione</option>
                {areas.map(area => (
                  <option value={area.name} key={area.id}>{area.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Bio:</span>
              <textarea value={bio || ''} onChange={e => setBio(e.target.value)}></textarea>
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