import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatLoading from "../../ToolComponents/Loading/Loading";
import Chatbox from "../ChatBox/Chatbox";
import "./ChatContainer.css";
import sound from "../../public/Messagenotification.mp3";
import sound2 from "../../public/currentchatnotification.mp3";
import {
  createCall,
  fetchUserMessages,
  findGroupMembers,
  findUserDetails,
  sendImage,
  sendMessage,
} from "../../API/ChatApiCalls";
import GroupInfo from "../GroupInfo/GroupInfo";
import { userHome } from "../../Redux/Actions/UserActions/UserHomeAction";
import { Avatar } from "@chakra-ui/react";
import {
  setMessagesAction,
  setSelectedUserAction,
  updateMessagesAction,
} from "../../Redux/Actions/UserActions/UserChatActions";

function ChatContainer({ chat, receiveMessage, outGoingCallRef }) {
  const dispatch = useDispatch();
  const socket = useRef();
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const messageData = useSelector((state) => state.messagesReducer);
  const { messages, messageLoading } = messageData;
  const recieverid = chat.members.find((id) => id !== userdata._id);
  const [userData, setUserData] = useState(null);

  const [messageloading, setmessageloading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(false);
  const [socketsendMessage, setsocketsendMessage] = useState(null);
  const [imageuploadloading, setimageuploadloading] = useState(false);
  const [members, setMembers] = useState();
  const [preview, setPreview] = useState("");

  const scrollRef = useRef();
  const imageinputref = useRef(null);
  // FOR SENDING MESSAGE TO SOCKET.IO

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    if (socketsendMessage) {
   socket.current.emit("send-message", socketsendMessage);
    }
  }, [socketsendMessage]);

  // TO RECIEVE MESSAGE FROM SOCKET IO WHICH IS PASSED FROM HOME COMPONENT

  useEffect(() => {
    if (receiveMessage.data) {
      console.log(receiveMessage);
      if (
        chat._id === receiveMessage.data[0].chatid &&
        userdata._id != receiveMessage.data[0].sender
      ) {
        dispatch(updateMessagesAction(receiveMessage.data));
        dispatch(userHome());
        new Audio(sound2).play();
        scrollRef.current.scrollIntoView();
      }

      if (chat._id !== receiveMessage.data[0].chatid) {
        console.log("SOUND PLAY");
        new Audio(sound).play();
      }
    }
  }, [receiveMessage]);

  const handleSendMessage = async () => {
    if (file) {
      setimageuploadloading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "noteapp");
      data.append("cloud_name", "dhajqatgt");
      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/dhajqatgt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then(async (result) => {
          let  group=chat.isGroupChat?true:false;
          let image = result.url;
          const { data } = await sendImage(
            userdata._id,
            chat._id,
            image,
            group,
            userdata.token
          );

          dispatch(updateMessagesAction(data));

          setsocketsendMessage({ data, recieverid });
          setFile("");
          dispatch(userHome());
          setimageuploadloading(false);
          setMessage("");
        });
    } else {
      let  group=chat.isGroupChat?true:false;
      const { data } = await sendMessage(
        userdata._id,
        chat._id,
        message,
        group,
        userdata.token
      );

      dispatch(updateMessagesAction(data));
      setsocketsendMessage({ data, recieverid });
      dispatch(userHome());
      setMessage("");
    }
  };

  // TO FETCH MESSAGES AND SELECTED USER DETAILS

  useEffect(() => {
    dispatch(setMessagesAction(chat._id));
    // findUserDetails(recieverid).then((data) => {
    //   setUserData(data.data);
    //
    // });
    const fetchuserDetails = async () => {
      if (chat.isGroupChat) {
        const { data } = await findGroupMembers(chat._id);
        setMembers(data);
      } else {
        const userDetails = await findUserDetails(recieverid);
        setUserData(userDetails.data);
        dispatch(setSelectedUserAction(userDetails.data));
      }
    };
    fetchuserDetails();
  }, [chat]);

  // TO SEND MESSAGE WHILE ENTER

  const handleEnterKey = (key) => {
    if (key === "Enter") {
      if (message != " " && message != "") {
        handleSendMessage();
      }
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [messageData, file]);

  // handle image input

  const handleimageinput = () => {
    console.log("IMAGE INPUT SELECTED");
    imageinputref.current.click();
    setMessage("");
  };

  // video call

  const videocall = () => {
    createCall(userdata._id, userData._id).then((data) => {
      socket.current = io("http://localhost:8800");
      let details = {
        recieverid,
        userdata,
        callid: data.data._id,
      };
      socket.current.emit("video-call", details);
      outGoingCallRef.current.click();
    });

    // creating call object in server request
  };

  // recieve call

  return (
    <div>
      <div className="ChatBox-container">
        <div className="chat-header">
          <Avatar
            style={{ margin: "0" }}
            size={"md"}
            name={
              chat.isGroupChat
                ? chat.chatName
                : userData
                ? userData.fullname
                : ""
            }
            src={chat.isGroupChat ? chat.photo : userData ? userData.photo : ""}
          />

          <h3 className="user-name">
            {chat.isGroupChat
              ? chat.chatName
              : userData
              ? userData.fullname
              : ""}
          </h3>
          <br />

          {chat.isGroupChat ? (
            <div className="groupchat-info">
              {" "}
              <GroupInfo
                members={members}
                chat={chat}
                currentuser={userdata._id}
              />{" "}
            </div>
          ) : (
            ""
          )}

          {
            chat.isGroupChat ? (
              ""
            ) : (
              <i
                style={{ color: "black" }}
                onClick={videocall}
                className="fa-solid fa-video video-call-icon"
              ></i>
            )
            // <button style={{backgroundColor:"black"}} >call</button>
          }
        </div>

        <hr />
        <div className="chat-body">
          {messageLoading ? (
            <ChatLoading />
          ) : messages ? (
            messages.map((m) => {
              let own = false;
              if (m[0].sender == userdata._id) {
                own = "own";
              }
              return (
                <>
                  <div ref={scrollRef}>
                    <Chatbox
                      chat={chat}
                      groupMembers={members}
                      own={own}
                      otheruser={userData}
                      message={m[0]}
                    />
                  </div>
                </>
              );
            })
          ) : (
            ""
          )}

          {file ? (
            <div className="image-preview">
              {/* <span  style={{marginLeft:"60%",cursor:"pointer"}}>X</span> */}
              <button
                onClick={() => setFile("")}
                style={{ marginLeft: "60%", cursor: "pointer" }}
              >
                X
              </button>
              <img
                className="preview-image"
                src={preview ? preview : ""}
                alt=""
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="chatBoxBottom">
          <input
            ref={imageinputref}
            onChange={(e) => {
              setFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            type="file"
            className="image-upload"
          />

          <i
            id="file-icon"
            onClick={() => handleimageinput()}
            class="fa-solid fa-paperclip"
          ></i>
          <textarea
            onKeyPress={(e) => {
              handleEnterKey(e.key);
            }}
            value={message}
            className="chatMessageInput"
            placeholder="write something..."
            onChange={(e) => {
              setMessage(e.target.value);
              setFile(false);
            }}
          ></textarea>
          {message.length == 0 && !file ? (
            <button disabled className="chatSubmitButton" type="button">
              Send
            </button>
          ) : imageuploadloading ? (
            <button d className="chatSubmitButton">
              Image is uploading
            </button>
          ) : (
            <button
              onClick={(e) => {
                handleSendMessage(e);
              }}
              className="chatSubmitButton"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
