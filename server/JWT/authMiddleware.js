const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require("../model/usermodel");
const dotenv = require("dotenv")
dotenv.config()

const protect = asynchandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token + "This is the token...");
      const decoded = jwt.verify(token, 'CHATINGER1234');
      next();
    } catch (error) {
      res.status(401).json("TOKEN INVALID");
    }
  }

  if (!token) {
    res.status(401).json("Token Not Found");
    console.log("U");
  }
});

module.exports = { protect };
