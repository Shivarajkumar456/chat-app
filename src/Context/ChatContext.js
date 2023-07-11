import { createContext, useContext, useReducer } from "react";
import AuthContext from './Authcontext';

const ChatContext = createContext();

export const ChatProvider = (props)=>{
    const {curUser} = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId:"null",
        user:{}
    }

    const chatReducer = (state,action)=>{
        switch(action.type){
            case "changeUser":
                return {
                    user:action.payload,
                    chatId: curUser.uid > action.payload.uid ? curUser.uid + action.payload.uid : action.payload.uid + curUser.uid
                }
                default: return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer,INITIAL_STATE);
    return (
        <ChatContext.Provider value={{data:state, dispatch}}>{props.children}</ChatContext.Provider>
    )
}

export default ChatContext;