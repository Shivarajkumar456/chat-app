import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import ChatContext from "../Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

const Messages = ()=>{
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ChatContext);

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats", data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages);
        });

        return ()=>{
            unSub();
        }
    }, [data]);

    return(
        <div className="messages">
        {messages.map(m=>{
            const timestamp = m.date;
            const date = timestamp.toDate(); // Convert to JavaScript Date object
            const dateString = date.toLocaleDateString(); // Get the date as a string
            const timeString = date.toLocaleTimeString();
            return <Message message={m} key={m.id} time={timeString} date={dateString}/>
            })}
            
        </div>
    )
}

export default Messages;