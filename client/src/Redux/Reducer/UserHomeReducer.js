import {
  CURRENT_CHAT_FAIL,
  CURRENT_CHAT_REQUEST,
  CURRENT_CHAT_SUCCESS,
  FIND_USER_FAIL,
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
  GET_CALLS_REQUEST,
  GET_CALLS_SUCCESS,
  SET_CURRENT_CHAT,
  SET_MESSAGES,
  SET_MESSAGE_REQUEST,
  SET_NOTIFICATION,
  SET_ONLINE_USERS,
  SET_SELECTED_USER,
  SET_SOCKET_SEND_MESSAGE,
  UPDATE_CURRENT_CHAT,
  UPDATE_MESSAGES,
  UPDATE_NOTIFICATION,
  USER_HOME_FAIL,
  USER_HOME_REQUEST,
  USER_HOME_SUCCESS,
} from "../Constants/userConstants";

export const userHomeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_HOME_REQUEST:
      return { loading: true };
    case USER_HOME_SUCCESS:
      return { loading: false, homedata: action.payload };
    case USER_HOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const findUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case FIND_USER_REQUEST:
      return { loading: true };
    case FIND_USER_SUCCESS:
      return { loading: false, userdata: action.payload };
    case FIND_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const curentChatReducer = (state = "hiiii", action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return { currentChat: action.payload };

    case UPDATE_CURRENT_CHAT:
      return { currentChat: action.payload };

    default:
      return state;
  }
};

export const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { notifications: action.payload };

    default:
      return state;
  }
};

export const onlineUserReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return { users: [action.payload] };

    default:
      return state;
  }
};

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MESSAGE_REQUEST:
      return { messageLoading: true };

    case SET_MESSAGES:
      return { messages: action.payload, messageLoading: false };

    case UPDATE_MESSAGES:
      return { messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

export const socketSendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SOCKET_SEND_MESSAGE:
      console.log(action.payload);
      return { message: action.payload };

    default:
      return state;
  }
};

export const setSelectedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return { userdata: action.payload };

    default:
      return state;
  }
};

export const getCallsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CALLS_REQUEST:
      return { loading: true };

    case GET_CALLS_SUCCESS:
      return { loading: false, calls: action.payload };
      
    default:
      return state;
  }
};
