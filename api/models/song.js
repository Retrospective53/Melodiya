const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const songSchema = new mongoose.Schema({
  title: { type: String, default: "untitled" },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileId: { type: String, required: true, unique: true },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  duration: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  playCount: { type: Number, default: 0 },
  description: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  picture: { type: String },
  private: { type: Boolean, default: true },
});

songSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

songSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Song", songSchema);
