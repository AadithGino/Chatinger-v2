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

function Home() {
  const callRef = useRef()
  const endCallRef = useRef()
  const outGoingCallRef = useRef()
  const socket = useRef();
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const { loading, error, homedata } = useSelector((state) => state.userHome);
  const chatData = useSelector((state) => state.currentChatReducer.currentChat);
  console.log(chatData);
  const [callData,setCallData]=useState()
  const [receiveMessage, setRecieveMessage] = useState("");
  const [loadsearch, setloadsearch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("add-new-user", userdata._id);
    socket.current.on("get-users", (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, [userdata]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data);
      setRecieveMessage(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    dispatch(userHome());
  }, []);


  useEffect(()=>{
    socket.current.on("recieve-call",(data)=>{
      if(data.recieverid===userdata._id){
        console.log("IM THE USER RECIEVEING CALL");
        setCallData(data)
        callRef.current.click()
      }
      console.log("CALL RECIEVED");
    })
  },[])

  useEffect(()=>{
    socket.current.on("endcall-outGoing",(data)=>{
      if(data===userdata._id){
        console.log("END RUNNING CALL");
        endCallRef.current.click()
      }
    })
  },[])

  
  return (
    <div className="main-div">
      <div className="messenger">
        <div className="chatMenu">
          <TopBar />
          <hr />
          <div className="chatMenuWrapper">
            <CallAlert callRef={callRef} callData={callData} endCallRef={endCallRef} />
            <OutGoingCallAlert outGoingCallRef={outGoingCallRef} callData={userdata}/>
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
                        <UserList details={m} />
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
              <ChatContainer outGoingCallRef={outGoingCallRef} chat={chatData} receiveMessage={receiveMessage} />
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
