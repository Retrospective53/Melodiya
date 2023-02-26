const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.get("/lol", (req, res) => {
  res.json({ lol: "aweaweawe" });
});

module.exports = app;
