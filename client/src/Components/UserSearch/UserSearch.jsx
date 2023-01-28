import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCreateChat, userSearch } from "../../API/ChatApiCalls";
import "./UserSearch.css";
import { setCurrentChat, userHome } from "../../Redux/Actions/UserActions/UserHomeAction";

function UserSearch({setcurentchat,setloadsearch}) {
  const dispatch = useDispatch()
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const [searchkeyword, setsearchkeyword] = useState("");
  const [users, setUsers] = useState([]);
  const handleSearch = async (e) => {
    console.log("HEEEEEEEEEEEE");
    e.preventDefault();
    setsearchkeyword("");
    const { data } = await userSearch(userdata._id, searchkeyword);
    console.log(data);
    setUsers(data);
  };

  const handleCreateChat = async(id) =>{
    const {data}= await userCreateChat(userdata._id,id)
    console.log(data);
    // setcurentchat(data)
    dispatch(setCurrentChat(data))
    setloadsearch(false)
    dispatch(userHome())
    
  }
  return (
    <div>
      <input
        value={searchkeyword}
        onChange={(e) => {
          setsearchkeyword(e.target.value);
        }}
        placeholder="Search for friends"
        className="chatMenuInput"
      />
      <button
        onClick={(e) => {
          handleSearch(e);
        }}
      >
        <i style={{color:"black"}} class="fa-solid fa-magnifying-glass"></i>
      </button>
      <div>
        {users
          ? users.length < 1 ? <h2>No Users Found</h2> : users.map((user) => {
            return (
              <div onClick={()=>{handleCreateChat(user._id)}} className="user-list-search">
                <div class="avatar">
                  <img
                    className="user-img"
                    src={user.photo?user.photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt=""
                  />
                </div>
                <span className="user-name">{user ? user.fullname : ""}</span>
              </div>
            );
          })
          : ""}
      </div>
    </div>
  );
}

export default UserSearch;
