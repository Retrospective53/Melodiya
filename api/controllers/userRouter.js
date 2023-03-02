const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, name, password, email, profilePicture } = request.body;

  if (username.length < 4) {
    return response.status(400).json({
      error: "username must be at least 4 characters long",
    });
  }

  if (password.length < 8) {
    return response.status(400).json({
      error: "password be at least 8 characters long",
    });
  }

  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = new User({
    username,
    name,
    passwordHash,
    email,
    profilePicture,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({})
    .populate("songs")
    .populate("favSongs")
    .populate("friends")
    .populate("following")
    .populate("followers");

  response.status(200).json(users);
});

userRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate("songs")
    .populate("favSongs")
    .populate("friends")
    .populate("following")
    .populate("followers");

  response.status(200).json(user);
});

userRouter.put("/:id", async (request, response) => {
  const { username, name, email, profilePicture, bio } = request.body;
  const user = await User.findByIdAndUpdate(
    request.params.id,
    {
      username,
      name,
      email,
      profilePicture,
      bio,
    },
    { new: true }
  );

  response.status(200).json(user);
});
module.exports = userRouter;
