require("dotenv").config();
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/userRouter");

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRouter);

app.get("/lol", (req, res) => {
  res.json({ lol: "aweaweawe" });
});

module.exports = app;
