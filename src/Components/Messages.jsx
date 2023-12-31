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

    const groupMessagesByDate = (messages) => {
        const groups = {};
        messages.forEach((message) => {
          const timestamp = message.date;
          const date = timestamp.toDate(); // Convert to JavaScript Date object
          const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
          const dateString = date.toLocaleDateString('en-US', options); // Get the date as a string
          if (!groups[dateString]) {
            groups[dateString] = [];
          }
          groups[dateString].push(message);
        });
        return groups;
      };
    
      const groupedMessages = groupMessagesByDate(messages);

      const formatDate = (dateString) => {
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        console.log(dateString)
        console.log(dateString.split('/'))
        const [month, day, year] = dateString.split('/');
        const formattedMonth = months[month - 1];
        const formattedYear = year.slice(-2);
      
        return `${formattedMonth} ${day}, ${formattedYear}`;
      };

    return(
        <div className="messages">
      {Object.entries(groupedMessages).map(([dateString, messages]) => (
        <div key={dateString}>
          <h4 className="date-heading">{formatDate(dateString)}</h4>
          {messages.map((message) => {
            const timestamp = message.date;
            const date = timestamp.toDate(); // Convert to JavaScript Date object
            const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
            const timeString = date.toLocaleTimeString(undefined, timeOptions);return(
            <Message
              message={message}
              key={message.id}
              time={timeString}
            />
          )})}
        </div>
      ))}
    </div>
    )
}

export default Messages;