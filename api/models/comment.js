const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Comment", commentSchema);
