const bcrypt = require("bcrypt");
const generateToken = require("../../JWT/generatetoken");
const USERSCHEMA = require("../../model/usermodel");
const twilio = require("../../OTP");
const client = require("twilio")(twilio.accountSID, twilio.authToken);
let details;

exports.Signup = async (req, res) => {
  try {
    // chcecking whether the number is already registered or not
    USERSCHEMA.findOne({ number: req.body.number }).then(async (data) => {
      if (data) {
        // if number is registered throws the error
        res.status(400).json("Number Already Registered");
      } else {
        // Here since the number is new the otp is sent
        let password = await bcrypt.hash(req.body.password, 10);
        console.log(password);
        details = {
          Firstname: req.body.Firstname,
          lastname: req.body.lastname,
          fullname: req.body.Firstname + " " + req.body.lastname,
          number: req.body.number,
          password,
        };
        // here we use twilio to sent otp
        USERSCHEMA.create(details).then((data) => {
          res.status(201).json(data);
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.OTPVerify = async (req, res) => {
  console.log(details);
  try {
    client.verify
      .services(twilio.serviceID)
      .verificationChecks.create({
        to: `+91${details.number}`,
        code: req.body.OTP,
      })
      .then((data) => {
        console.log(data);
        if (data.status == "approved") {
          console.log(data);
          USERSCHEMA.create(details).then((data) => {
            res.status(201).json(data);
          });
        } else {
          res.status(401).json("Incorrect OTP");
        }
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.Login = async (req, res) => {
  try {
    USERSCHEMA.findOne({ number: req.body.number }).then((result) => {
      if (result) {
        if (result.status) {
          bcrypt.compare(
            req.body.password,
            result.password,
            function (err, data) {
              if (data) {
                let details = {
                  _id: result._id,
                  fullname: result.fullname,
                  firstname: result.Firstname,
                  lastname: result.lastname,
                  number: result.number,
                  photo: result.photo,
                  token: generateToken(result._id),
                };
                res.status(200).json(details);
              } else {
                res.status(401).json("INCORRECT PASSWORD");
              }
            }
          );
        } else {
          res.status(400).json("Account Is Temporarly Suspended");
        }
      } else {
        res.status(401).json("USER NOT REGISTERED");
      }
    });
  } catch (error) {}
};
