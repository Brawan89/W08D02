const express = require("express");
const userRouter = express.Router();
const { register , login } = require("./../Controllers/user");

userRouter.post("/createUser" , register);

userRouter.post("/login" , login);

module.exports = userRouter;