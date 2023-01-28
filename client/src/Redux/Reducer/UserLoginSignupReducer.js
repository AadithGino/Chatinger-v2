import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_UPDATE,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "../Constants/userConstants";

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };

    case USER_SIGNUP_SUCCESS:
      return { loading: false, signupdata: action.payload };

    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userdata: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGIN_UPDATE:
      return { userdata: action.payload };

    case USER_LOGOUT:
      return { userdata: false };
    default:
      return state;
  }
};

export const verifyOTPReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return { loading: true };

    case VERIFY_OTP_SUCCESS:
      return { loading: false, otpdata: action.payload };

    case VERIFY_OTP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
