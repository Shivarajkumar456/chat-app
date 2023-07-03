import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../Firebase';
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = (props)=>{
    const [curUser, setCurUser] = useState({});

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurUser(user);
            console.log(user);
        });

        return ()=>{
            unsub();
        }
    },[]);

    return (
        <AuthContext.Provider value={{curUser}}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;