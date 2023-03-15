import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCallAction } from "../../Redux/Actions/UserActions/UserChatActions";
import CallUserList from "../CallUserLst/CallUserList";
import "./CallHistory.css";
import TopBar from "../TopBar/TopBar";
import Alert from "../Alert/Alert";
import { clearCallHistory } from "../../API/ChatApiCalls";
function CallHistory() {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCallAction(userdata._id));
  }, []);

  const clearhistory = () =>{
    clearCallHistory(userdata._id).then((data)=>{
      dispatch(getCallAction(userdata._id))
    })
  }
  const calls = useSelector((state) => state.getCallReducer.calls);

  return (
    <div className="call-history-main-div">
      <div className="call-history">
        <TopBar />
        <Alert action="Clear History" message="Are you sure to delete the call history" functiontobedone={clearhistory}  />
        <div className="call-history-menu-wrapped">
        {calls
          ? calls.map((m) => {
              let outGoing = false;
              let display = true;
              if (m.outGoing === userdata._id) {
                outGoing = true;
              }
              if(m.block.length > 1 || m.block[0]==userdata._id){
                display=false;
              }

              return (
                <>
                  {
                    display?<CallUserList user={m} />:''
                  }
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
