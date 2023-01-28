const express = require('express')
const router = express.Router();
const signup_login = require('../../controller/User/signup-login')

// USER SIGNUP
router.post("/signup",signup_login.Signup)

// SIGNUP-OTP-VERIFY
router.post("/verify-otp",signup_login.OTPVerify)

//USER LOGIN
router.post("/login",signup_login.Login)



module.exports = router;