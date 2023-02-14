const express = require("express");
const router = express.Router();
const adminLoginController = require("../../controller/Admin/login");
const adminhomecontroller = require("../../controller/Admin/home")


router.route("/login").post(adminLoginController.adminLogin)


router.route("/find-user").get(adminhomecontroller.findUser)


router.route("/block-user").get(adminhomecontroller.blockUser)

module.exports = router;
