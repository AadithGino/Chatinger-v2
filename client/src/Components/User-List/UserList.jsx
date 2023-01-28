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
  console.log(id + "THIS IS THE ID IN USERLIST");
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
            </div>
            {/* {
            props.details?.latestMessage?.sender === userdata._id? <p className="latest-message-userlist">You : {props.details?.latestMessage.isFile? 'Image':props.details?.latestMessage?.content}</p> : <p className="latest-message-userlist">{userDetails? userDetails.Firstname:''} : {props.details?.latestMessage.isFile?'Image':props.details?.latestMessage?.content}</p>
            } */}
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
