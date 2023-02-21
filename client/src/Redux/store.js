import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { adminLoginReducer } from "./Reducer/AdminReducer";
import {
  curentChatReducer,
  findUserDetailsReducer,
  getCallsReducer,
  messagesReducer,
  notificationReducer,
  onlineUserReducer,
  setSelectedUserReducer,
  socketSendMessageReducer,
  userHomeReducer,
} from "./Reducer/UserHomeReducer";
import {
  userLoginReducer,
  userSignupReducer,
  verifyOTPReducer,
} from "./Reducer/UserLoginSignupReducer";
import { videoCallIdReducer } from "./Reducer/VideoCallReducer";
const middleware = [thunk];

const reducer = combineReducers({
  userHome: userHomeReducer,
  findUser: findUserDetailsReducer,
  loginReducer: userLoginReducer,
  signUpReducer: userSignupReducer,
  otpReducer: verifyOTPReducer,
  currentChatReducer: curentChatReducer,
  notificationReducer: notificationReducer,
  messagesReducer: messagesReducer,
  socketSendMessageReducer: socketSendMessageReducer,
  setSelectedUserReducer: setSelectedUserReducer,
  getCallReducer:getCallsReducer,
  onlineUserReducer:onlineUserReducer,
  videoCallReducer:videoCallIdReducer,
  adminLoginReducer:adminLoginReducer
});

let userinfo = JSON.parse(localStorage.getItem("chatingerUserInfo"));
let admininfo = JSON.parse(localStorage.getItem("chatingerAdminInfo"));

const initialstate = {
  loginReducer: { userdata: userinfo },
  adminLoginReducer:{adminData:admininfo}
};

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
