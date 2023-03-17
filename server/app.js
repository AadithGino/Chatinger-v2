const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userHomeRoutes = require("./routes/UserRoutes/home-feature-routes");
const usersLogin_SignupRouter = require("./routes/UserRoutes/signup-login");
const userChatRoutes = require("./routes/UserRoutes/chat-Routes");
const userStatusRoutes = require("./routes/UserRoutes/status-Routes");
const userCallRoutes = require("./routes/UserRoutes/callRoutes")
const adminRoutes = require("./routes/Admin/adminLoginRoutes")
dotenv.config();

const app = express();

const cors = require("cors");
const { resolve } = require("path");
const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:8080"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// mongoose.connect(process.env.MONGOOSE_URL);
mongoose.connect("mongodb+srv://aadith:9744052977@cluster0.hyrqebp.mongodb.net/?retryWrites=true&w=majority")

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersLogin_SignupRouter);
app.use("/", userHomeRoutes);
app.use("/chat", userChatRoutes);
app.use("/status", userStatusRoutes);
app.use("/call", userCallRoutes);
app.use("/admin", adminRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

let arr = [1, 1, 1, 1,];

console.log(arr.reduce((acc, cu) => {
  return acc + cu
})
);



app.listen(5000, () => {
  console.log(5000);
});



module.exports = app;
