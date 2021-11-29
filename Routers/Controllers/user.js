const userModel = require("./../../db/models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT = Number(process.env.SALT);

const SECRET = process.env.SECRETKAY;

//create users
const register = async (req, res) => {
  const { email, password, role } = req.body;

  const saveEmail = email.toLowerCase();
  const hashedPass = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: saveEmail,
    password: hashedPass,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
/////////////////

//login
const login = (req, res) => {
  const { email, password } = req.body;
  const saveEmail = email.toLowerCase();
  userModel
    .findOne({ email: saveEmail })
    .then( async (result) => {
      if (result) {
        if (result.email == email) {
          const hashedPass = await bcrypt.compare(password, result.password);
          if (hashedPass) {
            const payload ={
              role: result.role,
            };
            const options = {
              expiresIn: "60m",
            }
            const token = await jwt.sign(payload, SECRET, options);
            res.status(200).json({result, token});
          } else {
            res.status(400).json("invalid email or passowrd");
          }
        } else {
          res.status(400).json("invalid email or passowrd");
        }
      } else {
        res.status(400).json("email does not exist");
      }
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = { register , login }