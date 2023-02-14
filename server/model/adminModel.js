const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    Name: {type:String},
    email:{type:String},
    password:{type:String}
})

const model = mongoose.model("Admin",adminSchema);

module.exports = model;