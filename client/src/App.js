import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/SIGNUP/Signup";
import VerifyOTP from "./Components/VerifyOtp/VerifyOTP";
import Status from "./Components/Status/Status";
import CallHistory from "./Components/CallHistory/CallHistory";

function App() {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  console.log(userdata);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            userdata ? <Navigate to="../home" /> : <Navigate to="../login" />
          }
        />
        <Route
          path="/home"
          element={userdata ? <Home /> : <Navigate to="../login" />}
        />
        <Route
          path="/login"
          element={userdata ? <Navigate to="../home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={userdata ? <Navigate to="../home" /> : <Signup />}
        />
        <Route
          path="/verify-otp"
          element={userdata ? <Navigate to="../home" /> : <VerifyOTP />}
        />
        <Route
          path="/status"
          element={userdata ? <Status /> : <Navigate to="../login" />}
        />
        <Route
          path="/call"
          element={userdata ? <CallHistory /> : <Navigate to="../login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
