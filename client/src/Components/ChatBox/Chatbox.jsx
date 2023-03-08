import React from "react";
import "./Chatbox.css";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { Avatar, Tooltip } from "@chakra-ui/react";
function Chatbox({ own, message, otheruser, groupMembers, chat,profile,block }) {
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
console.log(block+"TIS IS THE BLOCK CONDTION");
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
                     profile? <Tooltip label={m.user[0].fullname} aria-label='A tooltip' hasArrow arrowSize={15}>
                     <Avatar
                     size="sm"
                     name={m.user[0].fullname}
                     src={block?'':m.user[0].photo}
                   />
                   </Tooltip>:''
                      
                    );
                  }
                })
              ) : (
                ""
              )
            ) : (
              profile?<Avatar
              size="sm"
              name={otheruser ? otheruser.firstname : ""}
              src={block?'':otheruser ? otheruser.photo : ''}
            />:''
            )}
          </>
        )}
        {message.isFile ? (
          <img className="chat-img" src={message.content} alt="" />
        ) : (
          <div className={profile?"messageTextother":"messageText"}>
            <p>{message.content}</p>{" "}
            <p className="message-time">{format(message.time)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbox;
