const mongoose = require("mongoose");
const uniqueValidator = require("unique-validator");

const songSchema = new Schema({
  title: { type: string, default: "untitled" },
  artist: { type: Schema.Types.ObjectId, ref: "User" },
  fileUrl: { type: string, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  playCount: { type: Number, default: 0 },
  description: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  picture: { type: String },
});

songSchema.set("toJson", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

songSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Song", songSchema);
