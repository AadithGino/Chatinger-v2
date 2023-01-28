import { Avatar, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { findUserDetails } from "../../API/ChatApiCalls";
import "./UserListCommon.css";
import {format} from 'timeago.js'

function UserListCommon({ user }) {
  const [userDetails, setuserdetails] = useState("");
  console.log(user);
  const fetchuserdata = async () => {
    const { data } = await findUserDetails(user.userid);
    setuserdetails(data);
    console.log(data);
  };
  useEffect(() => {
    fetchuserdata();
  }, []);
  return (
    <div>
      <div className="home-page">
        <div>
          <div className="user-list-main">
            <div className="user-list">
              <WrapItem style={{ marginRight: "10px" }}>
                <Avatar
                  name={userDetails ? userDetails.fullname : ""}
                  src={userDetails ? userDetails.photo : ""}
                />
              </WrapItem>
              <span className="user-name">
                {userDetails ? userDetails.fullname : ""}
              </span>
            </div>
            <p>{format(user?user.time:'')}</p>
            <hr className="separating-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListCommon;
