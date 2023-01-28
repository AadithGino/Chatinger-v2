const chatSchema = require("../../model/chatModel");
const { db } = require("../../model/chatModel");
const { ObjectId } = require("mongodb");
// creating a group chat

exports.createGroupChat = async (req, res) => {
  try {
    const groupAdmin = req.body.id;
    let members = JSON.parse(req.body.members);
    console.log(req.body.members);
    if (members.length < 2) {
      res.status(400).json("AT LEAST 2 MEMBERS SHOULD BE IN A GROUP");
      console.log("AT LEAST 2 MEMBERS SHOULD BE IN A GROUP");
    } else {
      const groupchat = {
        chatName: req.body.chatName,
        isGroupChat: true,
        members,
        groupAdmin,
      }
      chatSchema.create(groupchat).then((data) => {
        res.status(201).json(data);
      });
    }
  } catch (error) {}
};

// getting group members details

exports.GropMembers = async (req, res) => {
  console.log("THIS IS THE GROUP DATA FETCHING ");
  chatSchema
    .aggregate([
      { $match: { _id: ObjectId(req.query.id) } },
      { $unwind: "$members" },
      {
        $project: {
          member: "$members",
        },
      },
      {
        $project: {
          user: "$member",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "USERS",
        },
      },
      {
        $project: {
          _id: 0,
          user: "$USERS",
        },
      },
    ])
    .then((data) => {
      res.status(200).json(data);
    });
};

// removing group members

exports.RemoveGroupMembers = async (req, res) => {
  try {
    let chatid = req.body.chatid;
    let userid = req.body.id;
    console.log(userid);
   chatSchema.findOne({_id:chatid}).then((data)=>{
    console.log(data.groupAdmin+"THIS IS THE ADMIB");
    if(data.groupAdmin===userid){
      res.status(400).json("Cannot Remove The Admin")
    }else{
      chatSchema.updateOne({_id:chatid},{$pull:{members:ObjectId(userid)}}).then((data)=>{
        chatSchema.findOne({_id:chatid}).then((data)=>{
          res.status(200).json(data)
         })
      })
    }
   })

  } catch (error) {

  }
};

// add Members 

exports.AddGroupMembers = async (req,res)=>{
    try {
        let chatid = req.body.chatid;
        let userid  = req.body.userid;
        chatSchema.updateOne({_id:chatid},{$push:{members:[ObjectId(userid)]}}).then((data)=>{
            console.log(data);
           chatSchema.findOne({_id:chatid}).then((data)=>{
            res.status(200).json(data)
           })
        })
    } catch (error) {
        
    }
}

// edit group name 

exports.editGroupName = async(req,res)=>{
    let chatid = req.body.chatid;
    let name  = req.body.name;
    try {
        chatSchema.updateOne({_id:chatid},{$set:{chatName:name}}).then((data)=>{
            console.log(data);
            chatSchema.findOne({_id:chatid}).then((data)=>{
              res.status(200).json(data)
             })
        })
    } catch (error) {
        
    }
}
