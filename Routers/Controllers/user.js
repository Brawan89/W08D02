const userModel = require("./../../db/models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRETKAY;

//create users
const register = async (req, res) => {
  const { email, password, role } = req.body;
  const SALT = Number(process.env.SALT);

  // email -> lowerCase
  const saveEmail = email.toLowerCase();
  //encryption password
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
  //email -> lowecase
  const saveEmail = email.toLowerCase();
  userModel
    .findOne({ email: saveEmail })
    .then(async (result) => {
      if (result) {
        if (result.email == saveEmail) {
          //يرجع الباسورد ويقدر يقراه
          const hashedPass = await bcrypt.compare(password, result.password);
          const payload = {
            email,
            // role: result.role,
          };
          if (hashedPass) {
           
            const options = {
              expiresIn: "60m",
            };
            const token = await jwt.sign(payload, SECRET, options);

            res.status(200).json({ result, token });
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

module.exports = { register, login };
