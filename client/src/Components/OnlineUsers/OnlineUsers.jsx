import React from 'react'

function OnlineUsers() {
  return (
    <div>
       <>
      {/* <TopBar /> */}
      <div className="home-page">
        <div>
          <div>
            <div className="user-list">
              <WrapItem style={{marginRight:"10px"}}>
                <Avatar
                  name={
                    details.isGroupChat
                      ? details.chatName
                      : userDetails
                      ? userDetails.fullname
                      : ""
                  }
                  src={
                    details.isGroupChat
                      ? details.chatName
                      : userDetails
                      ? userDetails.photo
                      : ""
                  }
                />
              </WrapItem>
              <span className="user-name">
                {details.isGroupChat
                  ? details.chatName
                  : userDetails
                  ? userDetails.fullname
                  : ""}
              </span>
            </div>

           
          </div>
        </div>
      </div>
    </>
    </div>
  )
}

export default OnlineUsers
