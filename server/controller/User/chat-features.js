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
  } catch (error) { }
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
  } catch (error) { }
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
        token: req.body.token
      };
    } else {
      details = {
        chatid: ObjectId(chatid),
        isFile: false,
        content: message,
        sender: req.body.id,
        time: Date.now(),
        token: req.body.token
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
  } catch (error) { }
};

exports.getMessages = async (req, res) => {
  try {
    let id = req.query.id;
    console.log(id);
    chatSchema.findOne({ _id: id }).then((data) => {
      res.status(200).json(data.messages);
      // console.log(data.messages);
    });
  } catch (error) { }
};

// Archive
exports.archiveChat = async (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  let user = req.body.user;
  try {


    chatSchema.findOne({ _id: id }).then((data) => {
      let contains = false


      for (let i = 0; i < data.archive.length; i++) {
        if (data.archive[i] == user) {
          contains = true
        }
      }
      if (contains) {
        chatSchema.updateOne({ _id: id }, { $pull: { archive: user } }).then((data) => {
          res.status(200).json(data)
        })
      } else {
        chatSchema.updateOne({ _id: id }, { $push: { archive: user } }).then((data) => {
          res.status(200).json(data)
        })
      }
    })
  } catch (error) {

  }
}



// blocking / unblocking the user 

exports.blockUser = async (req, res) => {
  console.log("PODA PODA");  
  const { id, chatid } = req.body;
  try {
    chatSchema.findOne({_id:chatid}).then((result)=>{
      let blocked = result.block.filter((m)=>m==id)
      if(blocked.length ==0 ){
        chatSchema.updateOne({_id:chatid},{$push:{block:id}}).then((data)=>{
          chatSchema.findOne({_id:chatid}).then((d)=>{
            res.status(200).json(d)
          })
        })
      }else{
        chatSchema.updateOne({_id:chatid},{$pull:{block:id}}).then((data)=>{
          chatSchema.findOne({_id:chatid}).then((d)=>{
            res.status(200).json(d)
          })
        })
      }
    })
  } catch (error) {
    
  }
}


// clear chat history 

exports.clearChat = async(req,res)=>{
  let id = req.query.id;
  try {
    chatSchema.updateOne({_id:id},{$set:{messages:[]}}).then((data)=>{
     chatSchema.findOne({_id:id}).then((data)=>{
      res.status(200).json(data)
     })
    })
  } catch (error) {
    
  }
}