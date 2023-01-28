import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCallAction } from "../../Redux/Actions/UserActions/UserChatActions";
import CallUserList from "../CallUserLst/CallUserList";
import "./CallHistory.css";
import TopBar from "../TopBar/TopBar";
function CallHistory() {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCallAction(userdata._id));
  }, []);
  const calls = useSelector((state) => state.getCallReducer.calls);

  return (
    <div className="call-history-main-div">
      <div className="call-history">
        <TopBar />
        <div className="call-history-menu-wrapped">
        {calls
          ? calls.map((m) => {
              let outGoing = false;
              if (m.outGoing === userdata._id) {
                outGoing = true;
              }
              return (
                <>
                  <CallUserList user={m} />
                </>
              );
            })
          : ""}
        </div>
      </div>
      <div className="call-history-details"></div>
    </div>
  );
}

export default CallHistory;
