import React from "react";
import "./Chatbox.css";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { Avatar } from "@chakra-ui/react";
function Chatbox({ own, message, otheruser, groupMembers, chat }) {
  console.log(message);
  const userdata = useSelector((state) => state.loginReducer.userdata);
  let msgboxstyle = "message";
  let msgtxtstyle = "message-Txt";
  let userimgstyle = "chatbox-user-img";
  let timetxtstyle = "chatbox-bottom-time";
  if (own == "own") {
    msgboxstyle = "messageown";
    msgtxtstyle = "message-Txt-own";
    userimgstyle = "chatbox-user-img-own";
    timetxtstyle = "chatbox-bottom-time-own";
  }

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own ? (
          ""
        ) : (
          <>
            {chat.isGroupChat ? (
              groupMembers ? (
                groupMembers.map((m) => {
                  if (m.user[0]._id == message.sender) {
                    return (
                      <Avatar
                        size="sm"
                        name={m.user[0].fullname}
                        src={m.user[0].photo}
                      />
                    );
                  }
                })
              ) : (
                ""
              )
            ) : (
              <Avatar
                size="sm"
                name={otheruser ? otheruser.firstname : ""}
                src={otheruser ? otheruser.photo : ""}
              />
            )}
          </>
        )}
        {message.isFile ? (
          <img className="chat-img" src={message.content} alt="" />
        ) : (
          <div className="messageText">
            <p>{message.content}</p>{" "}
            <p className="message-time">{format(message.time)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbox;
