const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 5 * 60,
  });

  response
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      expiresIn: "1h",
    })
    .sendStatus(200);
});

authRouter.get("/logout", async (request, response) => {
  response.clearCookie("token");
  response.send("cookie token cleared");
});

module.exports = authRouter;
