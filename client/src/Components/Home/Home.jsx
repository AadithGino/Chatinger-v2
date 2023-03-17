import React, { useRef } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setCurrentChat,
  userHome,
} from "../../Redux/Actions/UserActions/UserHomeAction";
import UserList from "../User-List/UserList";
import { useState } from "react";
import { io } from "socket.io-client";
import ChatContainer from "../ChatContainer/ChatContainer";
import UserSearch from "../UserSearch/UserSearch";
import TopBar from "../TopBar/TopBar";
import { setOnlineUsers } from "../../Redux/Actions/UserActions/UserChatActions";
import CallAlert from "../CallAlert/CallAlert";
import OutGoingCallAlert from "../OutGoingAlert/OutGoingCallAlert";
import { findUserDetails } from "../../API/ChatApiCalls";
import { socketURL } from "../../values";

function Home() {
  const callRef = useRef()
  const endCallRef = useRef()
  const outGoingCallRef = useRef()
  const socket = useRef();
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const { loading, error, homedata } = useSelector((state) => state.userHome);
  const chatData = useSelector((state) => state.currentChatReducer.currentChat);
  console.log(chatData);
  const [callData, setCallData] = useState()
  const [receiveMessage, setRecieveMessage] = useState("");
  const [loadsearch, setloadsearch] = useState(false);
  const [notification, setNotification] = useState([]);
  const [isTyping, setIsTypingHome] = useState(false);
  const [otherOnline,setOtherOnline]=useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(socketURL);
    socket.current.emit("add-new-user", userdata._id);
    socket.current.on("get-users", (users) => {
      dispatch(setOnlineUsers(users));
    });
    findUserDetails(userdata ? userdata._id : '').then((data) => {
      console.log("NOTIFI BACKEN");
      console.log(data.data.notification.length);
      if (data.data?.notification.length > 0) {
        console.log(data.data.notification)
        let noti = data.data.notification;
        setNotification(noti)
       
      }
    })
  }, [userdata]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      let contains = data.members.find((user) => user === userdata._id);
      if (contains) {
        setRecieveMessage(data);
      }
    });

    socket.current.on("block", (data) => {
      if (data.userid == userdata._id) {
        dispatch(userHome())
        // if (chatData._id == data.chat._id) {
          dispatch(setCurrentChat(data.chat))
        // }
      }
    })

    socket.current.on("clearchat", (data) => {
      if (data.userid == userdata._id) {
        dispatch(userHome())
        // if (chatData._id == data.chat._id) {
          dispatch(setCurrentChat(data.chat))
        // }
      }
    })
    

    socket.current.on("get-users", (users) => {
      console.log("GET_USERS_SOCKET.IO");
      setOtherOnline(users.find((m)=>m.userId==userdata._id))
      console.log(otherOnline);
      dispatch(setOnlineUsers(users));
    });
  }, []);

  useEffect(() => {
    dispatch(userHome());
  }, [receiveMessage]);


  useEffect(() => {
    socket.current.on("recieve-call", (data) => {
      if (data.recieverid === userdata._id) {
        setCallData(data)
        callRef.current.click()
      }
    })
  }, [])

  useEffect(() => {
    socket.current.on("endcall-outGoing", (data) => {
      if (data === userdata._id) {
        endCallRef.current.click()
      }
    })
  }, [])


  return (
    <div className="main-div">
      <div className="messenger">
        <div className="chatMenu">
          <TopBar notification={notification} setNotification={setNotification} />
          <hr />
          <div className="chatMenuWrapper">
            <CallAlert callRef={callRef} callData={callData} endCallRef={endCallRef} />
            <OutGoingCallAlert outGoingCallRef={outGoingCallRef} callData={userdata} />
            {loadsearch ? (
              ""
            ) : (
              <button
                style={{ color: "black" }}
                className="search-button"
                onClick={() => setloadsearch(!loadsearch)}
              >
                Search Users{" "}
                <i
                  style={{ color: "black", marginLeft: "3px" }}
                  class="fa-solid fa-magnifying-glass"
                ></i>
              </button>
            )}
            {loadsearch ? <UserSearch setloadsearch={setloadsearch} /> : ""}
            {loadsearch == false
              ? homedata
                ? homedata.map((m) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(setCurrentChat(m));
                      }}
                    >
                      <UserList details={m} notification={notification} isTyping={isTyping} />
                    </div>
                  );
                })
                : ""
              : ""}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWraper">
            {chatData ? (
              <ChatContainer setIsTypingHome={setIsTypingHome} outGoingCallRef={outGoingCallRef} chat={chatData} receiveMessage={receiveMessage} setNotification={setNotification} notification={notification} />
            ) : (
              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ marginLeft: "15%" }}
                  src="https://res.cloudinary.com/dhajqatgt/image/upload/v1672202300/finalchatinerglgoo_jdhu4x.png"
                  alt=""
                />
                <p>
                  Chat Online With Your Friends,Group Chat And All Other
                  Features....
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
