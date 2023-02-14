const userSchema = require('../../model/usermodel');

// find user

exports.findUser = async(req,res)=>{
    let id = req.query.id;
    try {
        userSchema.findOne({_id:id}).then((data)=>{
            res.status(200).json(data)
        }).catch((err)=>{
            res.status(400).json(err)
        })
    } catch (error) {
        
    }
}


// block user

exports.blockUser = async(req,res)=>{
    let id = req.query.id;
    try {
        userSchema.updateOne({_id:id},{$set:{status:false}}).then((data)=>{
            res.status(200).json(data)
        }).catch((err)=>{
            res.status(400).json(err)
        })
    } catch (error) {
        
    }
}

