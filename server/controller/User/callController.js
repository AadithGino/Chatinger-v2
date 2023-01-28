const { ObjectId } = require("mongodb");
const chatSchema = require("../../model/chatModel");
const callSchema = require("../../model/callModel");
exports.createCall = async (req, res) => {
  try {
    const chatid = req.body.chatid;

    let user1 = req.body.user1;
    let user2 = req.body.user2;
    let details = {
      members: [user1, user2],
      outGoing: user1,
      reciever: user2,
    };
    callSchema.create(details).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};

exports.updateCall = async (req, res) => {
  try {
    const chatid = req.body.chatid;
    const callid = req.body.call;

    let time = Date.now();

    chatSchema
      .updateOne(
        { _id: chatid, "calls.id": ObjectId(callid) },
        { $set: { "calls.$.endTime": time } }
      )
      .then((data) => {
        res.json(data);
      });
  } catch (error) {}
};

exports.getCalls = async (req, res) => {
  try {
    const id = req.query.id;
    callSchema
      .find({ members: { $in: [ObjectId(id)] } })
      .sort({ updatedAt: -1 })
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {}
};


exports.acceptCall = async (req,res)=>{
  try {
    const id = req.query.id;
    callSchema.updateOne({_id:id},{$set:{status:"Accept"}}).then((data)=>{
      res.status(200).json(data)
    })
  } catch (error) {
    
  }
}

exports.declineCall = async(req,res)=>{
  try {
    const id = req.query.id;
    callSchema.updateOne({_id:id},{$set:{status:"Declined"}}).then((data)=>{
      res.status(200).json(data)
    })
  } catch (error) {
    
  }
}