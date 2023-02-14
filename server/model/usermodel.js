const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    Firstname : {type:String},
    lastname : {type:String},
    fullname:{type:String},
    number:{type:Number,unique:true},
    password:{type:String},
    notification:[],
    photo : {type:String},
    status:{type:Boolean,default:true}
})

const model = mongoose.model('USER',userSchema)

module.exports = model;