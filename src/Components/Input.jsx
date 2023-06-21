import React from "react";
import Attach from '../img/attach.png';
import Img from '../img/img.png';
 
const Input = () => {
    return(
        <div className="input">
            <input type="text" placeholder="type something..." />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" id="file" style={{display:"none"}} />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input;