const messageRouter = require("express").Router();
const AnonUser = require("../models/userModel");
const AnonMessage = require("../models/messageModel");

messageRouter.get("/", async (req, res) => {
  const messages = await AnonMessage.find({});
  res.json(messages);
});

messageRouter.post("/", async (req, res) => {
  const body = req.body;

  const decodedUSer = await AnonUser.findById();

  const message = {
    content: body.message,
  };
});
