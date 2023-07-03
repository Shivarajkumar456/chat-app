import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../Firebase";
import {  useNavigate } from "react-router-dom";
import AuthContext from "../Context/Authcontext";


const Navbar = () => {
    const navigate = useNavigate();
    const {curUser} = useContext(AuthContext)
    return(
        <div className="navbar">
            <span className="logo">lama chat</span>
            <div className="user">
                <img src={curUser.photoURL} alt="" />
                <span>{curUser.displayName}</span>
                <button onClick={()=>{signOut(auth);
                navigate('/')}}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;