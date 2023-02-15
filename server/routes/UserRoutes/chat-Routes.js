const express = require("express");
const router = express.Router();
const chatController = require("../../controller/User/chat-features");
const groupController = require("../../controller/User/GroupChat");
const {protect} = require('../../JWT/authMiddleware')
// Create and creaet chat
router.post("/", chatController.CreateChat);

// send message
router.post("/send-message", chatController.sendMessage);

// get chats
router.get("/get-chats", chatController.GetChats);
// router.route("/get-chats").get(protect,chatController.GetChats)

// get messages
router.get("/get-messages", chatController.getMessages);

//members of group chat
router.get("/group-members", groupController.GropMembers);

//create group chat
router.post("/group-chat", groupController.createGroupChat);

//Remove Members From Group
router.post("/group-remove",groupController.RemoveGroupMembers)

// add members to Group 
router.post("/group-add",groupController.AddGroupMembers)

//change group name 
router.post("/group-change-name",groupController.editGroupName)



module.exports = router;
