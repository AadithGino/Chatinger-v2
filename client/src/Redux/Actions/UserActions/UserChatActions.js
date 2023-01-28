import axios from "axios";
import { useSelector } from "react-redux";
import {
  fetchUserMessages,
  findUserDetails,
  getCalls,
  sendMessage,
} from "../../../API/ChatApiCalls";
import {
  CURRENT_CHAT_FAIL,
  CURRENT_CHAT_REQUEST,
  CURRENT_CHAT_SUCCESS,
  GET_CALLS_REQUEST,
  GET_CALLS_SUCCESS,
  SET_MESSAGES,
  SET_NOTIFICATION,
  SET_ONLINE_USERS,
  SET_SELECTED_USER,
  SET_SOCKET_SEND_MESSAGE,
  UPDATE_MESSAGES,
  USER_SEND_MESSAGE_REQUEST,
  USER_SEND_MESSAGE_SUCCESS,
} from "../../Constants/userConstants";
const userdata = JSON.parse(localStorage.getItem("chatingerUserInfo"));

export const notificationAction = (data) => async (dispatch) => {
  dispatch({ type: SET_NOTIFICATION, payload: data });
};

export const setOnlineUsers = (data) => async (dispatch) => {
  dispatch({ type: SET_ONLINE_USERS, payload: data });
};

export const setMessagesAction = (id) => async (dispatch) => {
  fetchUserMessages(id).then((data) => {
    console.log(data.data);
    dispatch({ type: SET_MESSAGES, payload: data.data });
  });
};

export const updateMessagesAction = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_MESSAGES, payload: data });
};

export const sendMessageAction =
  (userid, chatid, message, token) => async (dispatch) => {
    sendMessage(userid, chatid, message, token).then((data) => {
      dispatch({ type: UPDATE_MESSAGES, payload: data.data });
      dispatch({ type: SET_SOCKET_SEND_MESSAGE, payload: data.data });
    });
  };

export const socketSendMessageAction = (data) => async (dispatch) => {
  dispatch({ type: SET_SOCKET_SEND_MESSAGE, payload: data });
};

export const setSelectedUserAction = (data) => async (dispatch) => {
  dispatch({ type: SET_SELECTED_USER, payload: data });
};

export const getCallAction = (id) => async (dispatch) => {
  dispatch({ type: GET_CALLS_REQUEST });

  getCalls(id).then((data) => {
    dispatch({ type: GET_CALLS_SUCCESS, payload: data.data });
  });
};
