require("dotenv").config();
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const userRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/loginRouter");

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/auth", loginRouter);

app.get("/lol", (req, res) => {
  res.json({ lol: "aweaweawe" });
});

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
