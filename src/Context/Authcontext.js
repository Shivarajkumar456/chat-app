import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../Firebase';
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props)=>{
    const [curUser, setCurUser] = useState(false);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurUser(true);
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