const { ObjectId } = require("mongodb");
const chatSchema = require("../../model/chatModel");
const userSchema = require("../../model/usermodel");

exports.CreateChat = async (req, res) => {
  try {
    let userid = req.body.id;
    let user2 = req.body.user;
    console.log(userid);
    console.log(user2);
    chatSchema
      .findOne({ members: { $all: [userid, user2] }, isGroupChat: false })
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          chatSchema.create({ members: [userid, user2] }).then((result) => {
            res.status(200).json(result);
          });
        }
      });
  } catch (error) {}
};

exports.GetChats = async (req, res) => {
  try {
    let id = req.query.id;
    
    ``;

    chatSchema
      .find({ members: { $in: [id] } })
      .sort({ updatedAt: -1 })
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {}
};

exports.sendMessage = async (req, res) => {
  let chatid = req.body.chatid;
  console.log(req.body);
  try {
    let message = req.body.message;
    let details;

    if (req.body.image) {
      details = {
        chatid: ObjectId(chatid),
        isFile: true,
        content: req.body.image,
        sender: req.body.id,
        time: Date.now(),
        token:req.body.token
      };
    } else {
      details = {
        chatid: ObjectId(chatid),
        isFile: false,
        content: message,
        sender: req.body.id,
        time: Date.now(),
        token:req.body.token
      };
    }
    chatSchema
      .updateOne(
        { _id: chatid },
        { $push: { messages: [details] }, $set: { latestMessage: details } }
      )
      .then((data) => {
        // console.log(details);
        res.status(200).json([details]);
        // console.log(details);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
};

exports.getMessages = async (req, res) => {
  try {
    let id = req.query.id;
    console.log(id);
    chatSchema.findOne({ _id: id }).then((data) => {
      res.status(200).json(data.messages);
      // console.log(data.messages);
    });
  } catch (error) {}
};
