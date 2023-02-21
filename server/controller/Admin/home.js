const userSchema = require('../../model/usermodel');

// find user

exports.findUser = async (req, res) => {
    let id = req.query.id;
    try {
        userSchema.findOne({ _id: id }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(400).json(err)
        })
    } catch (error) {

    }
}


// block user

exports.blockUser = async (req, res) => {
    let id = req.query.id;
    console.log("BLOICKK");
    try {
        let status = await userSchema.findOne({_id:id})
        console.log(status.status);
        userSchema.updateOne({ _id: id }, { $set: { status: !status.status } }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(400).json(err)
        })
    } catch (error) {

    }
}

// get all users
exports.getAllusers = async(req,res)=>{
    try {
        userSchema.find().then((data)=>{
            res.status(200).json(data)
            console.log(data);
        })
    } catch (error) {
        res.status(400).json(error)
    }
}