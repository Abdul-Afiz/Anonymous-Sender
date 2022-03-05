const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const User = require("../models/userModel");

loginRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

loginRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ email: body.email });
  const password =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  console.log({ user, password });

  if (!(user && password)) {
    return res.status(401).json({ error: "invalid email or password" });
  }

  const userToken = { id: email._id, email: email };

  const token = jwt.sign(userToken, process.env.Secret, {
    expiresIn: 60 * 60,
  });

  res.status(201).send({ token, id: user._id });
});

module.exports = loginRouter;
