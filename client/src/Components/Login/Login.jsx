import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction, userSignUpAction } from "../../Redux/Actions/UserActions/UserLoginSignupActions";
import Loading from "../../ToolComponents/Loading/Loading";
function Signup() {
  const signup = useSelector((state) => state.loginReducer);
  const { loading, error, userdata } = signup;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [password, setPassword] = useState();
  const [number,setNumber] = useState()
  const firstname = useRef();
  const Lastname = useRef();
  const Number = useRef();
  const Password = useRef();
  const cPassword = useRef();

  const handleSignup = () => {
   

    if(userdata){
      navigate("/home")
    }

    dispatch(userLoginAction(number, password));
  };
  return (
    <div className="signup-main-div">
      <div className="side-logo-img">
        <img
          src="https://res.cloudinary.com/dhajqatgt/image/upload/v1672202300/finalchatinerglgoo_jdhu4x.png"
          alt=""
        />
      </div>
      <div className="signup-form-div">
        <div>
          <h2>Login Form </h2>
          {
            loading ? <Loading/> : ''
          }
          {
            error ? <div className="error-div">{error}</div> :''
          }
          
        
          <input
            ref={Number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            placeholder="Number"
            className="signup-input-tag"
            type="number"
            name=""
            id=""
          />
          <input
            ref={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="signup-input-tag"
            type="password"
            name=""
            id=""
          />
          
          <div className="button-div">
            <button onClick={() => handleSignup()} className="SignUp-Button">
              LOGIN
            </button>{" "}
            <button onClick={()=>{navigate('/signup')}} className="Login-Button">Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
