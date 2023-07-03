import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, storage,db } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';
import Add from '../img/addAvatar.png'

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef()
    const passwordRef = useRef();
    const userNameRef = useRef();
    const fileRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userName = userNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, userName);

            await uploadBytesResumable(storageRef, file)

                .then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                        await updateProfile(res.user, {
                            displayName: userName,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid:res.user.uid,
                            displayName:userName,
                            email,
                            photoURL:downloadURL
                        });
                        await setDoc(doc(db, "userChats", res.user.uid),{});
                        navigate('/home');
                    }catch(err){
                        console.log(err)
                        setErr(true)
                    }
                    });
                }
            );
           
        }
        catch (err) {
            console.log(err)
            setErr(true)
        }
    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Logo</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="User Name" ref={userNameRef} />
                    <input type="email" placeholder="email" ref={emailRef} />
                    <input type="password" placeholder="password" ref={passwordRef} />
                    <input style={{ display: "none" }} type="file" id="file" ref={fileRef} />
                    <label htmlFor="file">
                        <img src={Add} alt="pic" />
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <p>Something went wrong...</p>}
                </form>
                <p>do you have an account? <Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;