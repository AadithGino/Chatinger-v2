import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateGroup from "../CreateGroup/CreateGroup";
import Profile from "../Profile/Profile";
import "./TopBar.css";

function TopBar({ setcurentchat, setgroupMembers, groupMembers }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <Profile />

      
      <i onClick={()=>navigate("/status")} className="fa-solid fa-spinner status-icon"></i>

      <i onClick={()=>navigate("/call")} class="fa-solid fa-phone status-icon"></i>

      <CreateGroup 
        currentuser={userdata._id}
        setcurentchat={setcurentchat}
        setgroupMembers={setgroupMembers}
        groupMembers={groupMembers}
      />
      
    </div>
  );
}

export default TopBar;
