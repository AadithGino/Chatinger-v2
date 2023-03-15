import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000'})
const config = {
  
    headers: {
      "Content-type": "application/json",
    },
  };

export const findUserDetails = (id) => API.get(`/find-user?id=`+id)
export const fetchUserMessages = (id) => API.get(`/chat/get-messages?id=`+id)
export const sendMessage = ( id, chatid, message,token,block ) => API.post('/chat/send-message',{ id, chatid, message,token,block },config)
export const sendImage = ( id, chatid, image,block ) => API.post('/chat/send-message',{ id, chatid, image,block },config)
export const userSearch = (id,search) => API.post('/search',{id,search},config)
export const userSearchforGroup = (id,search) => API.post('/search',{id,search},config)
export const userCreateChat = (id,user) => API.post('/chat',{id,user},config)
export const createGroup = (id,members,chatName)=>API.post('/chat/group-chat',{id,members,chatName},config)
export const findGroupMembers =(id)=> API.get(`/chat/group-members?id=`+id)
export const changeGroupName = (name,chatid) => API.post('/chat/group-change-name',{chatid,name},config)
export const chanegUserName = (id,firstname,lastname) =>API.post("/change-name",{firstname,lastname,id})
export const changeProfileImage = (id,image) => API.post("/change-photo",{id,image})
export const removeUserFromGroup = (id,chatid) => API.post("/chat/group-remove",{id,chatid},config)
export const getStatus = (id) => API.post('/status/get-status')
export const uploadStatus = (id,image) =>API.post("/status/status-upload",{id,image},config)
export const getMyStatus = (id) => API.get("/status/get-my-status?id="+id)
export const addView = (user,status) => API.post("/status/add-view",{user,status},config)
export const createCall = (user1,user2) => API.post("call/create-call",{user1,user2},config)
export const getCalls = (id) => API.get("/call/get-calls?id="+id,config)
export const acceptCall = (id) => API.get("/call/accept-call?id="+id,config)
export const declinecall = (id) => API.get("/call/decline-call?id="+id,config)
export const deleteMyStatus = (id) =>API.get("/status/delete-status?id="+id,config)
export const addNotification = (id,notification)=>  API.post("/add-notification",{id,notification},config);
export const removeNotification = (id,noti)=>API.post("/remove-notification",{id,noti},config)
export const adminLogin  = (email,password)=>API.post("/admin/login",{email,password},config)
export const adminGetAllUsers = () => API.get("/admin/get-all-user")
export const adminGetOneUser = (id) => API.get("/admin/find-user?id="+id)
export const blockUser = (id) => API.get("/admin/block-user?id="+id)
export const chatblockUser = (id,chatid) => API.post("/chat/block-user",{id,chatid},config)
export const clearUserChat = (id) => API.get("/chat/clear-chat?id="+id)
export const clearCallHistory = (id) =>API.post("/call/clear-call-history",{id},config)