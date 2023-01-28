import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findUserDetails } from "../../API/ChatApiCalls";
import { WrapItem, Avatar } from "@chakra-ui/react";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CallUserList.css";

function CallUserList({ user }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const [userDetails, setuserdetails] = useState("");

  const fetchuserdata = async () => {
    const userid = user ? user.members.find((m) => m != userdata._id) : "";
    const { data } = await findUserDetails(userid);
    setuserdetails(data);
    console.log(data);
  };
  useEffect(() => {
    fetchuserdata();
  }, []);
  let outgoing = false;
  if (userdata._id === user.outGoing) {
    outgoing = true;
  }
  return (
    <div>
      <div className="home-page">
        <div>
          <div className="user-list-main">
            <div className="user-list">
              <WrapItem style={{ marginRight: "10px" }}>
                <Avatar
                  name={user ? user.fullname : ""}
                  src={user ? user.photo : ""}
                />
              </WrapItem>
              <span className="user-name">
                {userDetails ? userDetails.fullname : ""}
              </span>
              {outgoing ? (
                <>
                  {" "}
                  <img
                    className="call-status-img-icon"
                    src="data:image/png;base64,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"
                    alt=""
                    srcset=""
                  />
                </>
              ) : (
               user.status==='Missed'? <img  className="call-status-img-icon" src="https://cdn-icons-png.flaticon.com/512/2228/2228048.png" alt="" srcset="" />: <img
               className="call-status-img-icon"
               src="data:image/png;base64,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"
               alt=""
               srcset=""
             />
              )}
            </div>
            <p>{format(user ? user.createdAt : "")}</p>
            <hr className="separating-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallUserList;
