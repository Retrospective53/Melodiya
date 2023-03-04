const Comment = require("../models/comment");
const CommentRouter = require("express").Router();

CommentRouter.get("/", async (request, response) => {
  const comments = await Comment.find({});
  response.status(200).json(comments);
});

module.exports = CommentRouter;
