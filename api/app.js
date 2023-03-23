require("dotenv").config();
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/userRouter");
const songRouter = require("./controllers/songRouter");
const storageRouter = require("./controllers/storageRouter");
const authRouter = require("./controllers/authRouter");

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(middleware.requestLogger);
app.use(express.static("public"));
// app.use(middleware.tokenExtractor);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/songs", songRouter);
app.use("/api/storage", storageRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
