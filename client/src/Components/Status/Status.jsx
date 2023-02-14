import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { addView, deleteMyStatus, getMyStatus, getStatus } from "../../API/ChatApiCalls";
import StatusUserList from "../StatusUserList/StatusUserList";
import TopBar from "../TopBar/TopBar";
import UploadStatus from "../UploadStatus/UploadStatus";
import UserListCommon from "../UserListCommon/UserListCommon";
import "./Status.css";

function Status() {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const [selectedStatus, setSelectedStatus] = useState();
  const [myStatus, setMyStatus] = useState(false);
  const [userData, setUserData] = useState();

  const [status, setStatus] = useState();
  useEffect(() => {
    getStatus().then((data) => {
      setStatus(data.data);
      console.log("hui");
    }, []);

    getMyStatus(userdata._id).then((data) => {
      if (data.data != null) {
        setMyStatus(data.data);
      }
    });
  }, []);

  const deletemystatus = () =>{
    deleteMyStatus(myStatus._id).then((data)=>{
      console.log(data);
      setMyStatus(false)
    })
  }

  return (
    <div className="status-main-div">
      <div className="status-list-css">
        <div className="status-menu">
          <TopBar />
          <hr />

          {myStatus ? (
            <div className="my-status">
              <div style={{ display: "flex" }}
                onClick={() => {
                  setSelectedStatus(myStatus ? myStatus : "");
                  setUserData(userdata);
                  console.log(userdata);
                }}
                className="user-list-search"
              >
                <div class="avatar">
                  <img
                    className="user-img"
                    src={myStatus ? myStatus.content : ""}
                    alt=""
                  />
                </div>
                <span>MY STATUS</span>
                <i onClick={deletemystatus} style={{marginLeft:"20%"}} className="fa-solid fa-ellipsis-vertical"></i>
                
              </div>
            </div>
          ) : (
            <UploadStatus status={status} setMyStatus={setMyStatus} />
          )}

          {status ? (
            status.map((m) => {
              console.log(m);
              if (m.userid !== userdata._id) {
                return (
                  <span
                    onClick={() => {
                      setSelectedStatus(m);
                      addView(userdata._id, m._id).then((data) => {
                        console.log(data);
                      });
                    }}
                  >
                    <StatusUserList setUserData={setUserData} user={m} />
                  </span>
                );
              }
            })
          ) : (
            <h2>No status</h2>
          )}
        </div>
      </div>
      <div className="status-view">
        {selectedStatus ? (
          <>
            <div className="status-view-div">
              <div className="top-user-details-status">
                <div className="chat-header">
                  <Avatar
                    style={{ margin: "0" }}
                    size={"md"}
                    name={userData ? userData.fullname : ""}
                    src={userData ? userData.photo : ""}
                  />

                  <h3 className="user-name">
                    {userData ? userData.fullname : ""}
                  </h3>
                  <br />
                  <p style={{ color: "black" }}>
                    {selectedStatus ? format(selectedStatus?.time) : ""}
                  </p>
                </div>
              </div>
              <div className="content-status-div">
                <img
                  className="status-image-view"
                  src={selectedStatus ? selectedStatus.content : ""}
                  alt=""
                />
              </div>
              {selectedStatus.userid == userdata._id ? (
                <>
                  {" "}
                  <h2>MY STATUS</h2>
                  <h3 style={{ color: "white" }}>
                    Views : ({" "}
                    {selectedStatus ? selectedStatus.views.length : ""} )
                  </h3>
                  <div className="view-user-list-status">
                    {selectedStatus
                      ? selectedStatus.views.map((data) => {
                        return (
                          <>
                            <UserListCommon user={data} />
                          </>
                        );
                      })
                      : ""}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Status;
