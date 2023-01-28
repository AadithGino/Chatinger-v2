const express = require("express");
const router = express.Router();
const userhome = require("../../controller/User/home-features-controller");




// search 
router.post("/search",userhome.SearchUser)

// find user details 
router.get("/find-user",userhome.findUserDetails)

//update name 
router.route("/change-name").post(userhome.UpdateName)

//update Profile Pic 
router.route("/change-photo").post(userhome.updateProfilePic)

//home 
router.post("/",userhome.Home)

// status
router.post("/status",userhome.userStatus)


module.exports = router;