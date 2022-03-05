const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/userModel");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const body = req.body;
  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = new User({
    email: body.email,
    username: body.username,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = userRouter;
