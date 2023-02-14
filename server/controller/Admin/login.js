const adminSchema = require("../../model/adminModel");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
    
    let email = req.body.email;
    

    // let Details = {
    //     Name,
    //     email,
    //     password: await bcrypt.hash(password,10)
    // }

    // adminSchema.create(Details).then((data)=>{
    //     res.json(data)
    // })      

    adminSchema.findOne({ email: email }).then((result) => {
        if (result) {
            bcrypt.compare(req.body.password,result.password,function (err, data) {
                if(data){
                    res.status(200).json(result)
                }else{
                    res.status(400).json("Incorrect Password")
                }
            })
        } else {
            res.status(400).json("Admin Details Not Found")
        }
    })
}