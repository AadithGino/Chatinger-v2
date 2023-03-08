import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { adminGetAllUsers } from '../../API/ChatApiCalls';
import AdminUserList from '../AdminUserList/AdminUserList';
import './AdminHome.css'

function AdminHome() {
    // useEffect(()=>{
    //     pref.current = pref1.current
    // })
    const pref = useRef()
 
    // const onClick = ()=>{
    //     pref.current = 'poda'
    // //     console.log(pref.current);
    // // }
    // let socket = useRef();
    // const [onlineUsers, setOnlineUsers] = useState();
    // const [users, setUsers] = useState([]);
    // const [blockUser, setBlockUser] = useState();

    // socket.current = io("http://localhost:8800");
    // socket.current.on("get-users", (users) => {
    //     console.log(users);
    //     setOnlineUsers(users)
    // });

    // useEffect(() => {
    //     console.log(blockUser);
    //     adminGetAllUsers().then((data) => {
    //         setUsers(data.data)
    //         console.log(users);
    //         console.log("hi");
    //     })
    // }, [blockUser])



    return (
        <div>
            {/* <div className="details">
           <h2>Number of online users {onlineUsers ? onlineUsers.length : 0}</h2>
            <h2>Number of total users {users ? users.length : ''}</h2>
           </div>
           <div className="containderusers">
            <div className="allusers">
                <h1>ALL USERS</h1>
            {
                users ? users.map((m) => {
                    return (
                        <AdminUserList setBlockUser={setBlockUser} user={m} />
                    )
                }) : ''
            }
            </div>
            <div className="onlineusers">
                <h1>ONLINE USERS</h1>
                {
                    onlineUsers?onlineUsers.map((m)=>{
                        return(
                            <>
                            <AdminUserList user={m} />
                            </>
                        )

                    }):''
                }
            </div>
           </div> */}
      <input style={{border:"1px solid black"}} type="text" name="" id="" />
      <p ref={pref}>hey</p>
       <button onClick={(e)=>{
        console.log(pref);
        pref.current.innerText = "ppppp"
       }}>click me </button>
        

    
        </div>
    )
}

export default AdminHome