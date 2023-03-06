const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Song = require("./song");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  descriptions: { type: String },
  duration: { type: Number },
  private: { type: Boolean, default: false },
});

playlistSchema.pre("save", async function (next) {
  try {
    const songs = await Song.find({ _id: { $in: this.songs } });
    const duration = songs.reduce((sum, song) => sum + song.duration, 0);
    this.duration = duration;
    next();
  } catch (err) {
    next(err);
  }
});

playlistSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

playlistSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Playlist", playlistSchema);
