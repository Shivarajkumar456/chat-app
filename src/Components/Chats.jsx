import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/Authcontext";
import { db } from "../Firebase";

const Chats = () => {
    const { curUser } = useContext(AuthContext);
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
    console.log(chats);
    return (
        <div className="chats">
            <div className="userChat">
                <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <div className="userChatInfo">
                    <span>Raj</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats;