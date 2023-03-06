require("dotenv").config();
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/loginRouter");
const songRouter = require("./controllers/songRouter");
const storageRouter = require("./controllers/storageRouter");

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static("public"));
app.use(middleware.tokenExtractor);

app.use("/api/users", userRouter);
app.use("/api/auth", loginRouter);
app.use("/api/songs", middleware.userExtractor, songRouter);
app.use("/api/storage", middleware.userExtractor, storageRouter);

app.get("/lol", (req, res) => {
  res.json({ lol: "aweaweawe" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
