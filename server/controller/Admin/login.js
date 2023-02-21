const adminSchema = require("../../model/adminModel");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
    
    let email = req.body.email;

    adminSchema.findOne({ email: email }).then((result) => {
        if (result) {
            bcrypt.compare(req.body.password,result.password,function (err, data) {
                if(data){
                    let details = {
                        _id:result._id,
                        Name:result.Name,
                        email:result.email
                    }
                    res.status(200).json(details)
                }else{
                    res.status(400).json("Incorrect Password")
                }
            })
        } else {
            res.status(400).json("Admin Details Not Found")
        }
    })
}