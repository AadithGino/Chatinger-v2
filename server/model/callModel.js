const mongoose = require("mongoose");

const callSchema = mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId }],
  startTime: { type: Number, default: Date.now() },
  endTime: { type: Number },
  status: { type: String,default:"Missed"},
  outGoing: { type: mongoose.Schema.Types.ObjectId },
  reciever: { type: mongoose.Schema.Types.ObjectId },
},
{
  timestamps: true,
});

const model = mongoose.model("Call", callSchema);

module.exports = model;
