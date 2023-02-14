const userModel = require("../../model/usermodel")


exports.addNotification = async (req, res) => {
    let notifcation = req.body.notifcation;
    let id = req.body.id;
    userModel.updateOne({ _id: id }, { $push: { notification: { notifcation } } }).then((data) => {
        res.status(201).json(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
}

exports.deteteNotification = async (req, res) => {
    let chatid = req.body.chatid;
    let id = req.body.id;

    userModel.updateOne({ _id: id }, { $pull: { notification: { chatid: chatid } } }).then((data) => {
        res.status(201).json(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
}

// clear notification 

exports.clearNotification = async(req,res)=>{
    let id  = req.query.id;

    userModel.updateOne({_id:id},{$set:{notification:[]}}).then((data)=>{
        res.status(400).json(data)
    })
}