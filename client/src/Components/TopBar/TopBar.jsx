import { Badge, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentChat } from "../../Redux/Actions/UserActions/UserHomeAction";
import CreateGroup from "../CreateGroup/CreateGroup";
import Profile from "../Profile/Profile";
import "./TopBar.css";

function TopBar({ setcurentchat, setgroupMembers, groupMembers, notification, setNotification }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const { loading, error, homedata } = useSelector((state) => state.userHome);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  return (
    <div className="topbar">
      <Profile />

      <i
        onClick={() => navigate("/status")}
        className="fa-solid fa-spinner status-icon"
      ></i>

      <i
        onClick={() => navigate("/call")}
        class="fa-solid fa-phone status-icon"
      ></i>


      <Menu>
        <MenuButton>
          <i className="fa-solid fa-bell noti-icon">
            <Badge ml="2" mb='7' colorScheme="red">
              {notification ? notification ? notification.length : 0 : ''}
            </Badge>
          </i>
        </MenuButton>
        <MenuList>
          {
            notification ? notification.length != 0 ? notification ? notification.map((m) => {
              return (
                <>
                  <MenuItem onClick={() => {
                    setNotification(notification.filter((data) => data[0].chatid != m[0].chatid));
                    let chat = homedata.find((data) => data._id === m[0].chatid)
                    dispatch(setCurrentChat(chat))
                  }} >
                    {
                      m[0].content
                    }
                   
                  </MenuItem>
                </>
              )
            }
            ) : '' : 'No New Messages' : ''
          }

          { }
        </MenuList>
      </Menu>

      <CreateGroup
        currentuser={userdata._id}
        setcurentchat={setcurentchat}
        setgroupMembers={setgroupMembers}
        groupMembers={groupMembers}
      />
    </div>
  );
}

export default TopBar;
