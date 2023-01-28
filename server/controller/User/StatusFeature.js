const statusSchema = require("../../model/statusModel");
const chatSchema = require("../../model/chatModel");
const { ObjectId } = require("mongodb");

// upload status

exports.uploadStatus = async (req, res) => {
  try {
    const id = req.body.id;
    let details;
    console.log(req.body.image + "THIS IS IMAGE");
    if (req.body.image) {
      details = {
        isFile: true,
        userid: id,
        content: req.body.image,
      };
    } else {
      details = {
        isFile: false,
        userid: id,
        content: req.body.message,
      };
    }

    statusSchema.create(details).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get status

exports.getStatus = async (req, res) => {
  try {
    console.log("STATY");
    statusSchema.find({}).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};

// getting the logged in user details.

exports.getMyStatus = async (req, res) => {
  try {
    const id = req.query.id;
    statusSchema.findOne({ userid: id }).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};

// add views

exports.addView = async (req, res) => {
  console.log("ADD VIEW");
  try {
    const statusid = req.body.status;
    const userid = req.body.user;
    const details = {
      userid: ObjectId(userid),
      time: Date.now(),
    };
    statusSchema
      .findOne({ _id: statusid, "views.userid": ObjectId(userid) })
      .then((data) => {
        console.log(data);
        if (data === null) {
          statusSchema
            .updateOne({ _id: statusid }, { $addToSet: { views: details } })
            .then((data) => {
              res.status(200).json(data);
            });
        }
      });

   

  } catch (error) {}
};
