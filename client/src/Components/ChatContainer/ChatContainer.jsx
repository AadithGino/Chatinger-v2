import React from "react";
import addnotification from 'react-push-notification';
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
import ReactAudioPlayer from 'react-audio-player';

import {
  addNotification,
  createCall,
  fetchUserMessages,
  findGroupMembers,
  findUserDetails,
  removeNotification,
  sendImage,
  sendMessage,
} from "../../API/ChatApiCalls";
import GroupInfo from "../GroupInfo/GroupInfo";
import { setVideoCallidAction, userHome } from "../../Redux/Actions/UserActions/UserHomeAction";
import { Avatar } from "@chakra-ui/react";
import {
  setMessagesAction,
  setSelectedUserAction,
  updateMessagesAction,
} from "../../Redux/Actions/UserActions/UserChatActions";
import { useNavigate } from "react-router-dom";
import OtherUserProfile from "../OtherUserProfile/OtherUserProfile";


function ChatContainer({ chat, receiveMessage, outGoingCallRef, setNotification, notification, setIsTypingHome }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const socket = useRef();
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const messageData = useSelector((state) => state.messagesReducer);
  const { messages, messageLoading } = messageData;
  const recieverid = chat.members.find((id) => id !== userdata._id);
  const [userData, setUserData] = useState(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messageloading, setmessageloading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [socketsendMessage, setsocketsendMessage] = useState(null);
  const [imageuploadloading, setimageuploadloading] = useState(false);
  const [members, setMembers] = useState();
  const [preview, setPreview] = useState("");
  const onlineUser = useSelector((state) => state.onlineUserReducer.users);
  const [online, setOnline] = useState(false);
  const [Block,setBlock]=useState()
  let blocked = false;
  let block = false;


  useEffect(() => {
    let status = false;
    status = onlineUser ? onlineUser[0].find((item) => item.userId === recieverid) : ""
    console.log(status);
    console.log("ONLINE USER");
    if (status) {
      setOnline(true)
    } else {
      setOnline(false)
    }
    if (chat.block.length != 0) {
      if (chat.block.lenght == 2) {
        blocked = true;
        block = true
      }

      if (chat.block[0] == recieverid) {
        blocked = true;
      } else {
        block = false;
      }
    }
    console.log(chat.block);
    console.log(blocked);
    console.log("BLOCKEDD");
  }, [chat, onlineUser,Block])

  const scrollRef = useRef();
  const imageinputref = useRef(null);
  // FOR SENDING MESSAGE TO SOCKET.IO

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    if (socketsendMessage) {
      let data = {
        socketsendMessage,
        isGroupChat: chat.isGroupChat ? true : false,
        members: chat.members
      }
      socket.current.emit("send-message", data);
      let typingdata = {
        id: userdata._id,
        chatid: chat._id
      }
      socket.current.emit("stopTyping", typingdata)

    }
  }, [socketsendMessage]);


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
          let group = chat.isGroupChat ? true : false;
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
      const { data } = await sendMessage(
        userdata._id,
        chat._id,
        message,
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
    setIsTyping(false);
    setTyping(false);
    let clearednoti = notification.filter((data) => data[0].chatid != chat._id)
    setNotification(notification.filter((data) => data[0].chatid != chat._id))
    removeNotification(userdata._id, clearednoti)
    dispatch(setMessagesAction(chat._id));
    console.log(chat ? chat : '');
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
  }, [chat,Block]);



  // TO RECIEVE MESSAGE FROM SOCKET IO WHICH IS PASSED FROM HOME COMPONENT

  useEffect(() => {
    console.log(receiveMessage);
    if (receiveMessage.socketsendMessage) {
      if (
        chat._id === receiveMessage.socketsendMessage.data[0].chatid &&
        userdata._id != receiveMessage.socketsendMessage.data[0].sender
      ) {
        dispatch(updateMessagesAction(receiveMessage.socketsendMessage.data));
        dispatch(userHome());
        new Audio(sound2).play();


        // addnotification({
        //   title: `A new message from ${chat.isGroupChat ? chat.chatName : userData ? userData.fullname : ''}`,
        //   subtitle: chat.isGroupChat ? chat.chatName : userData ? userData.fullname : '',
        //   message: '',
        //   theme: 'darkblue',
        //   native: true // when using native, your OS will handle theming.
        // });
        console.log(receiveMessage.socketsendMessage.data);
        // }

        scrollRef.current.scrollIntoView();
      }

      if (chat._id !== receiveMessage.socketsendMessage.data[0].chatid) {
        let contains = receiveMessage.members.find((user) => user === userdata._id);
        console.log(contains);
        if (contains) {

          let noticontains = notification.find((data) => data[0].chatid === receiveMessage.socketsendMessage.data[0].chatid)

          if (!noticontains) {
            setNotification([receiveMessage.socketsendMessage.data, ...notification])
            addNotification(userdata._id, [receiveMessage.socketsendMessage.data])
            console.log(receiveMessage.socketsendMessage.data);
          }
          new Audio(sound).play();
        }
      }
    }
  }, [receiveMessage]);


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


  // typing indicator 

  useEffect(() => {
    // socket.current = io("http://localhost:8800");
    socket.current.on("typing", (data) => {

      if (data.id != userdata._id) {
        setIsTypingHome(data)
        console.log("SET TYPING WITH DATA");

        setIsTyping(data)
      }
      if (isTyping) {
        scrollRef.current.scrollIntoView();
      }
    })

    socket.current.on("stoptyping", (data) => {
      setIsTypingHome(false)
      setIsTyping(false)
    })
  }, [typing])

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
     
      navigate("/video-call")

      if(chat.block.length < 1){
        dispatch(setVideoCallidAction(data.data._id))
        socket.current.emit("video-call", details);
      }
      outGoingCallRef.current.click();
    });

    // creating call object in server request
  };

  // recieve call

  return (
    <div>
      <div className="ChatBox-container">
        <div className="chat-header">
          
          <OtherUserProfile chat={chat} userData={userData} recieverid={recieverid} setBlock={setBlock} />

          <div style={{ display: 'flex', flexDirection: "column" }}>
            <h3 className="user-name">
              {chat.isGroupChat
                ? chat.chatName
                : userData
                  ? userData.fullname
                  : ""}
            </h3>
            {
              chat.block.length != 0 ? chat.block.length > 1? <h2 style={{ color: "black" }}>You have blocked this contact</h2> :chat.block[0] == recieverid ? <h2 style={{ color: "black" }}>You are blocked</h2> : <h2 style={{ color: "black" }}>You have blocked this contact</h2> : ''
            }

            {


              isTyping ? isTyping.chatid == chat._id ? <h3 style={{ color: "black" }}>Typing</h3> : '' : ''

            }
            {
              chat.isGroupChat ? '' : online ? <p style={{ color: "black" }}>Online</p> : ''
            }
            {
              console.log(isTyping)
            }
          </div>
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
            
          }
        </div>

        <hr />
        <div className="chat-body">
          {messageLoading ? (
            <ChatLoading />
          ) : messages ? (
            messages.map((m, i) => {
              let own = false;
              let profile = false;
              let block = false;
              if (m[0].sender == userdata._id) {
                own = "own";
              }
              if (i > 1) {
               
                if (m[0].sender != messages[i - 1][0].sender && m[0].sender != userdata._id) {

                  profile = true
                }
              }
              if (i < 1) {
                profile = true
              }
              if(chat.block.length > 0){
                console.log();
                if(chat.block[0]==recieverid || chat.block.length > 1){
                  block = true;
                }
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
                      profile={profile}
                      block = {block}
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
                onClick={() => setFile()}
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
        {
             chat.block.length != 0 ? chat.block.length > 1? <h2 style={{ color: "black" }}>You have blocked this contact</h2> :chat.block[0] == recieverid ? <>
             {/* <audio style={{height:"50px"}} controls autoPlay src="./Ye-Bhagwa-Rang-DJ.mp3"></audio> */}
             <audio src="./Ye-Bhagwa-Rang-DJ.mp3" controls autoPlay />
             <input
               ref={imageinputref}
               onChange={(e) => {
                 setFile(e.target.files[0]);
                 console.log(e.target.files[0]);
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
   
                 if (!typing) {
   
                   setTyping(true)
                   let data = {
                     id: userdata._id,
                     chatid: chat._id
                   }
                   socket.current = io("http://localhost:8800");
                   socket.current.emit('Typing', data)
                 }
   
                 let lastTypingTime = new Date().getTime();
                 let timerLength = 3000;
   
                 setTimeout(() => {
                   setTyping(false)
                   console.log("STOP TYPING");
                   let timeNow = new Date().getTime();
                   let timeDifference = timeNow - lastTypingTime;
                   let data = {
                     id: userdata._id,
                     chatid: chat._id
                   }
                   if (timeDifference >= timerLength && typing) {
                     socket.current = io("http://localhost:8800");
                     socket.current.emit("stopTyping", data)
                   }
                 }, timerLength);
               }}
             ></textarea>
             {message.length == 0 && !file ? (
               <img onClick={(e) => {
   
               }} className="send-image" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/send-icon.png" alt="" />
             ) : imageuploadloading ? (
               <button d className="chatSubmitButton">
                 Image is uploading
               </button>
             ) : (
              
               <img onClick={(e) => {
                 handleSendMessage(e);
               }} className="send-image" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/send-icon.png" alt="" />
             
             )}
            </> : <h2 style={{ color: "black" }}>You have blocked this contact</h2> :  <>
          
          <audio src="./Ye-Bhagwa-Rang-DJ.mp3" controls autoPlay />
          <input
            ref={imageinputref}
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
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

              if (!typing) {

                setTyping(true)
                let data = {
                  id: userdata._id,
                  chatid: chat._id
                }
                socket.current = io("http://localhost:8800");
                socket.current.emit('Typing', data)
              }

              let lastTypingTime = new Date().getTime();
              let timerLength = 3000;

              setTimeout(() => {
                setTyping(false)
                console.log("STOP TYPING");
                let timeNow = new Date().getTime();
                let timeDifference = timeNow - lastTypingTime;
                let data = {
                  id: userdata._id,
                  chatid: chat._id
                }
                if (timeDifference >= timerLength && typing) {
                  socket.current = io("http://localhost:8800");
                  socket.current.emit("stopTyping", data)
                }
              }, timerLength);
            }}
          ></textarea>
          {message.length == 0 && !file ? (
            <img onClick={(e) => {

            }} className="send-image" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/send-icon.png" alt="" />
          ) : imageuploadloading ? (
            <button d className="chatSubmitButton">
              Image is uploading
            </button>
          ) : (
           
            <img onClick={(e) => {
              handleSendMessage(e);
            }} className="send-image" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/send-icon.png" alt="" />
          
          )}
         </>
          }
         
        </div>
       
      </div>
    </div>
  );
}

export default ChatContainer;
