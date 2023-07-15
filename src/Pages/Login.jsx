import React, {useRef, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import logo from '../img/logo4.png';

const Login = ()=>{
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    
    const emailRef = useRef()
    const passwordRef = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        }catch(err){
            setErr(true)
        }
    }
    return (
        <div className="formContainer">
            <div  className="formWrapper">
                <img src={logo} alt='logo' className='logo'/>
                <span className="title">Sign In</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" ref={emailRef} />
                    <input type="password" placeholder="password" ref={passwordRef} />
                    <button>Sign In</button>
                    {err && <p>Something went wrong...</p>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;