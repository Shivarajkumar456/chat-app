import React, { useState, useContext } from "react";
import { collection, getDocs, query, setDoc, where, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import AuthContext from "../Context/Authcontext";


const Search = () => {
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { curUser } = useContext(AuthContext)

    const searchHandle = async () => {
        const queryName = userName.toLowerCase();
        const q = query(collection(db, "users"), 
        where("displayName", "in", [queryName, queryName.replace(/^\w/, c => c.toUpperCase())]));
        try {
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(doc => {
                setUser(doc.data());
                console.log(doc.data());
            });
        } catch (err) {
            setErr(true)
        }

    }
    const handleKey = e => {
        e.code === "Enter" && searchHandle();
    }

    const selectHandle = async () => {
        // check wether user chats exists, if not create
        const combinedId = curUser.uid > user.uid ? curUser.uid + user.uid : user.uid + curUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                const curUserDoc = doc(db, "userChats", curUser.uid);
                const userDoc = doc(db, "userChats", user.uid);
                await updateDoc(curUserDoc, {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                await updateDoc(userDoc, {
                    [combinedId + ".userInfo"]: {
                        uid: curUser.uid,
                        displayName: curUser.displayName,
                        photoURL: curUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        } catch (err) {
            console.log(err);
        }
        setUser(null)
        setUserName("")
        // create user chats
    }
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="find a user" onKeyDown={handleKey} value={userName} onChange={e => setUserName(e.target.value)} />
            </div>
            {err && <span>something went wrong</span>}
            {user && <div className="userChat" onClick={selectHandle}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;