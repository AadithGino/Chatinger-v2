import React, { useEffect, useState } from 'react'
import { adminGetOneUser, blockUser } from '../../API/ChatApiCalls';
import './AdminUserList.css'
import { Avatar } from '@chakra-ui/react'
import Alert from '../Alert/Alert';

function AdminUserList({ setBlockUser,user }) {
    const [userDetails, setUserDetails] = useState();
    useEffect(() => {
        adminGetOneUser(user._id).then((data) => {
            setUserDetails(data.data)
            console.log(data);
        })
    }, [])
    const blockuser = () =>{
        blockUser(userDetails._id).then((data)=>{
            setBlockUser(data)
        })
    }
    return (
        <div>
            <div className="adminUserListContainer">
                <div className="imgArea">
                    <Avatar size={'md'} name={userDetails ? userDetails.fullname : ''} />
                </div>
                <div className="nameArea">
                    <h2>{userDetails ? userDetails.fullname : ''}</h2>
                </div>
                <div className="delete">
                    <Alert message={"Are You Sure You Want To Block The User"}
                        action={userDetails?userDetails.status?"Block":"Unblock":''}
                        functiontobedone={blockuser} />
                </div>
            </div>
        </div>
    )
}

export default AdminUserList