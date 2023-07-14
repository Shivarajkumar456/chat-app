import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import logo  from '../img/logo4.png';
import { auth } from "../Firebase";
import {  useNavigate } from "react-router-dom";
import AuthContext from "../Context/Authcontext";

const Navbar = () => {
    const navigate = useNavigate();
    const {curUser} = useContext(AuthContext);
    
    const changeDp = ()=>{
        navigate('/profile');
    }

    return(
        <div className="navbar">
            <img src={logo} alt="logo" id="logo"/>
            <div className="user">
                <img src={curUser.photoURL} alt="" onClick={changeDp}/>
                <span>{curUser.displayName}</span>
                <button onClick={()=>{signOut(auth);
                navigate('/')}}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;