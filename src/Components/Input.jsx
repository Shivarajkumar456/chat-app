import React, { useContext, useState } from "react";
import Img from '../img/img.png';
import Attach from '../img/attach.png'
import AuthContext from "../Context/Authcontext";
import ChatContext from "../Context/ChatContext";
import { Timestamp, arrayUnion, doc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../Firebase";
import {v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
 
const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const {curUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const submitHandle = async ()=>{
        try{
        if(img){
            const storageRef = ref(storage, uuid());
            await uploadBytesResumable(storageRef, img)
            .then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                            await updateDoc(doc(db,'chats', data.chatId), {
                                messages:arrayUnion({
                                    id:uuid(),
                                    text,
                                    senderId:curUser.uid,
                                    date:Timestamp.now(),
                                    img:downloadURL
                                })
                            })
                        }catch(err){
                            console.log(err);
                        }
                        
                    })
                }
            )
        }else{
            await updateDoc(doc(db,'chats', data.chatId), {
                messages:arrayUnion({
                    id:uuid(),
                    text,
                    senderId:curUser.uid,
                    date:Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db,"userChats",curUser.uid), {
            [data.chatId+".lastMessage"] : {text},
            [data.chatId + ".date"] : serverTimestamp()
        });
        await updateDoc(doc(db,"userChats",data.user.uid), {
            [data.chatId+".unreadCount"]: increment(1),
            [data.chatId+".lastMessage"] : {text},
            [data.chatId + ".date"] : serverTimestamp()
        });
    }catch(error){
        console.log(error);
    }
        setText("");
        setImg(null);
    }
    
    return(
        <div className="input">
            <textarea placeholder="type something..." value={text} onChange={(e)=>setText(e.target.value)}/>
            <div className="send">
                <input type="file" id="file" style={{display:"none"}} onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <img src={Attach} alt="" />
                <button onClick={submitHandle}>Send</button>
            </div>
        </div>
    )
}

export default Input;