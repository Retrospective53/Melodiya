require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  created: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

const user = new User({
  username: "melodiosa",
  name: "melodio",
});

user.save().then((result) => {
  console.log("user saved");
  mongoose.connection.close();
});
