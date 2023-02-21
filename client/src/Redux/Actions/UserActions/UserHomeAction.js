import axios from "axios";

import {
  FIND_USER_FAIL,
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
  SET_CURRENT_CHAT,
  USER_HOME_FAIL,
  USER_HOME_REQUEST,
  USER_HOME_SUCCESS,
} from "../../Constants/userConstants";
import { SET_VIDEO_CALL_ID } from "../../Constants/videoCallConstant";
const baseUrl = "http://localhost:5000";

export const userHome = () => async (dispatch) => {
  try {
    // console.log("USER HOME DISPATCHED"+userinfo._id);

    let userinfo = JSON.parse(localStorage.getItem("chatingerUserInfo"));
    console.log(userinfo._id);
    dispatch({ type: USER_HOME_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/chat/get-chats?id=" + userinfo._id
    );
    console.log(data);
    console.log(userinfo._id);

    dispatch({ type: USER_HOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_HOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const findUserDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: FIND_USER_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/find-user?id=" + id
    );

    dispatch({ type: FIND_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};


export const setCurrentChat = (chat) =>async(dispatch)=>{
  dispatch({type:SET_CURRENT_CHAT,payload:chat})
}

export const setVideoCallidAction = (data) =>async(dispatch)=>{
  dispatch({type:SET_VIDEO_CALL_ID,payload:data})
  console.log("KOOOI");
}