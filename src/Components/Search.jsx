import React from "react";

const Search = () => {
    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="find a user"/>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <div className="userChatInfo">
                    <span>Raj</span>
                </div>
            </div>
        </div>
    )
}

export default Search;