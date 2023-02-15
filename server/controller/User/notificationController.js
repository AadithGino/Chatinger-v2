const userModel = require("../../model/usermodel")


exports.addNotification = async (req, res) => {
    console.log("hi");

    let notifcation = req.body.notification;
    let id = req.body.id;
    console.log(notifcation);
    console.log("^^^^^^^^^");
    userModel.updateOne({ _id: id }, { $push: { notification: notifcation[0] } }).then((data) => {
        res.status(201).json(data)
        console.log(data);
    }).catch((err) => {
        res.status(400).json(err)
    })
}

exports.deteteNotification = async (req, res) => {
    let noti = req.body.noti;
    console.log("NOTIFICATION REMOVED");
    
    let id = req.body.id;
    console.log(noti);

    userModel.updateOne({ _id: id }, { $set: { notification: noti } }).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
}

// clear notification 

exports.clearNotification = async (req, res) => {
    let id = req.query.id;

    userModel.updateOne({ _id: id }, { $set: { notification: [] } }).then((data) => {
        res.status(200).json(data)
    })
}  