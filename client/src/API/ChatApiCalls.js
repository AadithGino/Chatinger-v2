import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000'})
const config = {
  
    headers: {
      "Content-type": "application/json",
    },
  };

export const findUserDetails = (id) => API.get(`/find-user?id=`+id)
export const fetchUserMessages = (id) => API.get(`/chat/get-messages?id=`+id)
export const sendMessage = ( id, chatid, message,token ) => API.post('/chat/send-message',{ id, chatid, message,token },config)
export const sendImage = ( id, chatid, image,token ) => API.post('/chat/send-message',{ id, chatid, image,token },config)
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