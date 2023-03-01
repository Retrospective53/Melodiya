const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: [6, "username must be at least 6 characters"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  passwordHash: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  favSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  profile: { type: String },
  bio: { type: String, default: `Hello I am ${this.name}` },
  createdAt: { type: Date, default: Date.now },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchemas.set("toJson", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
