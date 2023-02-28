const express = require("express");
const router = express.Router();
const userhome = require("../../controller/User/home-features-controller");
const userNotification = require("../../controller/User/notificationController")
const upload = require('../../multer');
const cloudinary = require("../../cloudinary")

// search 
router.post("/search", userhome.SearchUser)

// find user details 
router.route("/find-user").get(userhome.findUserDetails)

//update name 
router.route("/change-name").post(userhome.UpdateName)

//update Profile Pic 
router.route("/change-photo",upload.array("image")).post(userhome.updateProfilePic)

//home 
router.route("/").post(userhome.Home)

// status
router.route("/status").post(userhome.userStatus)

// add notifcation 
router.route("/add-notification").post(userNotification.addNotification)

// remove notification 
router.route("/remove-notification").post(userNotification.deteteNotification)


module.exports = router;