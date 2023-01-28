const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    sender : {type:mongoose.Schema.Types.ObjectId,ref:"USER"},
    content : {type:String, trim :true},
    isFile:{type:Boolean,default:false},
    chat : {type:mongoose.Schema.Types.ObjectId,ref:"CHAT"}
},{
    timestamps : true,
})

const model = mongoose.model("Message",MessageSchema)

module.exports = model;