const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");
const ttl = require("mongoose-ttl");

const statusSchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId },
  isFile: { type: Boolean },
  content: { type: String },
  time: { type: Number, default: Date.now() },
  views:[]
});

statusSchema.plugin(ttl, { ttl: "1d" });

const model = mogoose.model("Status", statusSchema);

module.exports = model;
