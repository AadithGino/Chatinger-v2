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

  let blocked = false;
  const id = props.details.members.find((m) => m !== userdata._id);
  console.log(props.notification);
  console.log(props.details._id);
  const number = props.notification.filter(
    (data) => data[0].chatid === props.details._id
  );
  console.log(number.length + "THIS IS the number of notifications ");
  const fetchuserdata = async () => {
    const { data } = await findUserDetails(id);
    setuserdetails(data);
    console.log(data);
  };
  useEffect(() => {
    if (props.details.block.length == 2) {
      blocked = true;
    }
    if (props.details.block[0] != userdata._id) {
      blocked = true;
    }
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
                      : props.details.block.length > 0
                      ? props.details.block.length > 1
                        ? ""
                        : props.details.block[0] == userdata._id
                        ? userDetails
                          ? userDetails.photo
                          : ""
                        : ""
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

              {number.length === 0 ? (
                ""
              ) : (
                <span className="notification-badge"></span>
              )}
            </div>
            {props.details.latestMessage.sender == userdata._id ? (
              <p style={{ marginRight: "5rem" }}>
                You :{" "}
                {props.details.latestMessage.isFile
                  ? "Image"
                  : props.details.latestMessage.content.slice(0, 10)}
              </p>
            ) : (
              <p style={{ marginRight: "5rem" }}>
                {props.details.latestMessage.isFile
                  ? "Image"
                  : props.details.latestMessage.content.slice(0, 10)}
              </p>
            )}
            <p style={{ color: "green" }}>
              {props.isTyping
                ? props.isTyping.chatid == props.details._id
                  ? "Typing..."
                  : ""
                : ""}
            </p>
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
