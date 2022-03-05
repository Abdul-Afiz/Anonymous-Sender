const config = require("./utils/config");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const loginRouter = require("./Routers/loginRouter");
const userRouter = require("./Routers/userRouter");

const middleWare = require("./utils/middleware");

app.use(express.json());
app.use(middleWare.logger);

app.use("/api/signup", userRouter);
app.use("/api/login", loginRouter);

app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorHandler);

try {
  mongoose.connect(config.mongoUrl);
  console.log("connected to mongodb successfully");
} catch (error) {
  console.log({ error });
}

module.exports = app;
