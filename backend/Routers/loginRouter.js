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

  const email = await User.findOne({ email: body.email });
  const password =
    email === null
      ? false
      : await bcrypt.compare(body.password, email.passwordHash);

  console.log({ email: email, password });

  if (!(email && password)) {
    return res.status(401).json({ error: "invalid email or password" });
  }

  const Emailtoken = { id: email._id };

  const token = jwt.sign(Emailtoken, process.env.Secret, {
    expiresIn: 60 * 60,
  });

  console.log({ token });

  res.status(201).send({ token, id: email._id });
});

module.exports = loginRouter;
