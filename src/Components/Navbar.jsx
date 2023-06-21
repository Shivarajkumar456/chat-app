import React from "react";

const Navbar = () => {
    return(
        <div className="navbar">
            <span className="logo">lama chat</span>
            <div className="user">
                <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <span>Shiva</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;