import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserDetails } from "../../API/ChatApiCalls";
import { findUserDetailsAction } from "../../Redux/Actions/UserActions/UserHomeAction";
import { format } from "timeago.js";
import { WrapItem, Avatar } from "@chakra-ui/react";
import "./UserList.css";
function UserList(props) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const dispatch = useDispatch();
  const [userDetails, setuserdetails] = useState("");
  const userdetails = useSelector((state) => state.findUser);
  const id = props.details.members.find((m) => m !== userdata._id);
  console.log(props.notification);
  console.log(props.details._id);
  const number = props.notification.filter((data)=>data[0].chatid===props.details._id)
  console.log(number.length+"THIS IS the number of notifications ");
  const fetchuserdata = async () => {
    const { data } = await findUserDetails(id)
    setuserdetails(data);
    console.log(data);
  };
  useEffect(() => {
    fetchuserdata();
  }, []);

  return (
    <>
      <div className="home-page">
        <div>
          <div className="user-list-main">
            <div className="user-list">
              <WrapItem style={{ marginRight: "10px" }}>
                <Avatar
                  name={
                    props.details.isGroupChat
                      ? props.details.chatName
                      : userDetails
                      ? userDetails.fullname
                      : ""
                  }
                  src={
                    props.details.isGroupChat
                      ? props.details.chatName
                      : userDetails
                      ? userDetails.photo
                      : ""
                  }
                />
              </WrapItem>
              <span className="user-name">
                {props.details.isGroupChat
                  ? props.details.chatName
                  : userDetails
                  ? userDetails.fullname
                  : ""}
              </span>

              
             
              {number.length===0?'': <span className="notification-badge"></span>}
            </div>
            <p style={{color:"green"}}>{props.isTyping?props.isTyping.chatid==props.details._id?'Typing...':'':''}</p>
            <p className="latest-message-time-userlist">
              {format(props.details.updatedAt)}
            </p>
            <hr className="separating-line" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
