import axios from "axios";
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
} from "../../Constants/userConstants";

export const userSignUpAction =
  (Firstname, lastname, number, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/signup",
        { Firstname, lastname, number, password },
        config
      );
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const userLoginAction = (number, password) => async (dispatch) => {
  try {
    console.log(number, password);
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/login",
      { number, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("chatingerUserInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const verifyOTPAction = (OTP) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_OTP_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/verify-otp",
      { OTP },
      config
    );
    dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const updateUserData = (data) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_UPDATE, payload: data });
  localStorage.setItem("chatingerUserInfo", JSON.stringify(data));
};

export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("chatingerUserInfo")
  dispatch({ type: USER_LOGOUT });
};
