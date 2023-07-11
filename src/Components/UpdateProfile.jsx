import { useContext, useState } from 'react';
import AuthContext from '../Context/Authcontext';
import Add from '../img/addAvatar.png';
import './UpdateProfile.css';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { curUser } = useContext(AuthContext);
  const [err, setErr] = useState(false);
  const photoURL = curUser.photoURL;

  const [displayName, setDisplayName] = useState(curUser.displayName);
  const [img, setImg] = useState(null);

  const updateUser = async (e) => {
    e.preventDefault(); // Prevent form submission and page refresh

    try {
      if (img) {
        const storageRef = ref(storage, displayName);
        await uploadBytesResumable(storageRef, img)
          .then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                await updateProfile(auth.currentUser, {
                  displayName: displayName,
                  photoURL: downloadURL,
                });
              } catch (err) {
                console.log(err);
              }
            });
          });
      } else {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
      }
    } catch (err) {
      console.log(err);
      setErr(true);
    }
    navigate('/home');
  };

  const cancelHandle = () => {
    navigate('/home');
  };

  return (
      <div className='updateprofile'>
        <form onSubmit={updateUser}>
          <img src={photoURL} alt='profilePic' />
          <input
            type='text'
            placeholder={displayName}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            id='file'
            type='file'
            style={{ display: 'none' }}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor='file'>
            <img src={Add} alt='' />
            <span>Add an Avatar</span>
          </label>
          <button type='submit'>Update</button>
        </form>
        {err && <div>Something went wrong...</div>}
        <button onClick={cancelHandle}>Cancel</button>
      </div>
  );
};

export default UpdateProfile;
