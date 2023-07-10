import React, { useContext, useEffect, useRef } from "react";
import AuthContext from "../Context/Authcontext";
import ChatContext from "../Context/ChatContext";

const Message = (props) => {
    const {curUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef()

    useEffect(()=>{
        ref.current?.scrollIntoView({behaviour:"smooth"})
    },[props.message])
    return(
        <div ref={ref} className={`message ${props.message.senderId === curUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={props.message.senderId === curUser.uid? curUser.photoURL : data.user.photoURL} alt="" />
                <span>{props.time}</span>
            </div>
            <div className="messageContent">
                <p>{props.message.text}</p>
                {props.message.img && <img src={props.message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message;