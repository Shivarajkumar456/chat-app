import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/Authcontext";
import { db } from "../Firebase";
import ChatContext from "../Context/ChatContext";

const Chats = () => {
    const { curUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = () => {
            const unSub = onSnapshot(doc(db, "userChats", curUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unSub();
            }
        }
        curUser.uid && getChats();
    }, [curUser]);
    const handleSelect = (u)=>{
        dispatch({type:'changeUser', payload:u})
    }
    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat)=>
                <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
            )}
        </div>
    )
}

export default Chats;