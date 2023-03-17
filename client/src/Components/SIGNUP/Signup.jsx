import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { userSignUpAction } from "../../Redux/Actions/UserActions/UserLoginSignupActions";
import Loading from "../../ToolComponents/Loading/Loading";
function Signup() {
  const signup = useSelector((state) => state.signUpReducer);
  const { loading, error, signupdata } = signup;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [FirstName, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const firstname = useRef();
  const Lastname = useRef();
  const Number = useRef();
  const Password = useRef();
  const cPassword = useRef();
  console.log(cpassword);
  const handleSignup = () => {
    if (FirstName.length == 0) {
    }

    

    dispatch(userSignUpAction(FirstName, lastname, number, password));
  };
  useEffect(()=>{
    if(signupdata){
      navigate("/login")
    }
  },[signupdata])

  console.log(error);
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
          <h2>SignUp Form </h2>
          {
            loading ? <Loading/> : ''
          }
          {
            error ? <div className="error-div">{error}</div> :''
          }
          {/* <div className="error-div"></div> */}
          <input
            ref={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder="FirstName"
            className="signup-input-tag"
            type="text"
            name=""
            id=""
          /> 
          <br />
          <input
            ref={Lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="LastName"
            className="signup-input-tag"
            type="text"
            name=""
            id=""
          />
          <br />
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
          <br />
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
          <br />
          <input
            ref={cPassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
            placeholder="Confirm Password"
            className="signup-input-tag"
            type="password"
            name=""
            id=""
          />
          <div className="button-div">
            <button onClick={() => handleSignup()} className="SignUp-Button">
              Signup
            </button>{" "}
            <button onClick={()=>{navigate('/login')}} className="Login-Button">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
