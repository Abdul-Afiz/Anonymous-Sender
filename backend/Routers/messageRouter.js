const messageRouter = require("express").Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/userModel");
const Message = require("../models/messageModel");

messageRouter.get("/", async (req, res) => {
  const messages = await Message.find({});
  res.json(messages);
});

messageRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const token = req.token;
  console.log({ token });

  const decodToken = await jwt.verify(token, process.env.Secret);
  console.log({ decodToken });
  if (!decodToken) {
    res.status(400).json({ error: "invalid token or missing" });
  }

  const user = await User.findById(decodToken.id);
  const message = {
    content: body.message,
    user: user._id,
  };

  const savedMsg = await message.save();
  user.messages = user.messages.concat(savedMsg._id);
  await user.save();
  res.status(201).json(savedMsg);
});
