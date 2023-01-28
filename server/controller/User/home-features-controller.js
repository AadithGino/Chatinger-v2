const statusSchema = require("../../model/statusModel");
const userSchema = require("../../model/usermodel");
const chatSChema = require("../../model/chatModel");
const generateToken = require("../../JWT/generatetoken");
exports.Home = async (req, res) => {
  try {
    chatSChema
      .find({ $or: [{ user1: req.body.id }, { user2: req.body.id }] })
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {}
};

exports.SearchUser = async (req, res) => {
  console.log(req.body.search);
  try {
    const searchKeyword = req.body.search;
    userSchema
      .find({
        fullname: { $regex: ".*" + searchKeyword + ".*", $options: "i" },
      })
      .find({ _id: { $ne: req.body.id } })
      .then((data) => {
        res.status(200).json(data);
        console.log(data);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findUserDetails = async (req, res) => {
  try {
    let id = req.query.id;
    userSchema.findOne({ _id: id }).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};

exports.UpdateName = async (req, res) => {
  let id = req.body.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const fullname = firstname + " " + lastname;

  try {
    userSchema
      .updateOne(
        { _id: id },
        {
          $set: {
            Firstname: firstname,
            lastname: lastname,
            fullname: fullname,
          },
        }
      )
      .then((data) => {
        userSchema.findOne({ _id: id }).then((result) => {
          let details = {
            _id: result._id,
            firstname: result.Firstname,
            lastname: result.lastname,
            number: result.number,
            photo: result.photo,
            token: generateToken(result._id),
          };
          res.status(200).json(details);
        });
      });
  } catch (error) {}
};

exports.updateProfilePic = async (req, res) => {
  let id = req.body.id;
  let image = req.body.image;

  userSchema.updateOne({ _id: id }, { $set: { photo: image } }).then((data) => {
    console.log(data);
    userSchema.findOne({ _id: id }).then((result) => {
      let details = {
        _id: result._id,
        firstname: result.Firstname,
        lastname: result.lastname,
        number: result.number,
        photo: result.photo,
        token: generateToken(result._id),
      };
      res.status(200).json(details);
    });
  });
};

exports.userStatus = async (req, res) => {
  try {
    let name = "25 sec";
    let image = "image";
    statusSchema.create({ name, image }).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};
