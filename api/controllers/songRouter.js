const songRouter = require("express").Router();
const Song = require("../models/song");
const Genre = require("../models/genre");
const User = require("../models/user");
const b2Method = require("../storage/backblaze");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mm = require("music-metadata");
const { request } = require("express");

songRouter.get("/", async (request, response) => {
  const songs = await Song.find({});
  response.status(200).json(songs);
});

songRouter.get("/:id", async (request, response) => {
  const song = await Song.findById(request.params.id);
  response.status(200).json(song);
});

songRouter.post(
  "/metadata",
  upload.single("song"),
  async (request, response) => {
    // const user = request.user;

    const filePath = request.file.path;
    const metadata = await mm.parseFile(filePath);
    const duration = Math.round(metadata.format.duration);
    const pictureId = metadata.common.picture[0].data;
    response.status(201).json(metadata);
  }
);

songRouter.post("/", upload.single("file"), async (request, response) => {
  const { title, genres, image, picture } = request.body;
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  if (genres) {
    for (let genreName of genres) {
      const existingGenre = await Genre.findOne({ name: genreName });
      if (existingGenre) {
        song.genres.push(existingGenre._id);
      } else {
        const newGenre = new Genre({ name: genreName });
        const savedGenre = await newGenre.save();
        song.genres.push(savedGenre._id);
      }
    }
  }

  const filePath = request.file.path;
  const metadata = await mm.parseFile(filePath);
  const duration = Math.round(metadata.format.duration);
  console.log(metadata.common.picture[0]);
  const pictureId = await b2Method.uploadFile(
    "image.jpg",
    metadata.common.picture[0].data
  );
  response.status(201).json(pictureId);

  // const fileId = await b2Method.uploadFile(request.file.originalname, filePath);
  // const artist = user._id;

  // const song = new Song({
  //   title,
  //   artist,
  //   genres,
  //   image,
  //   fileId,
  //   duration,
  //   picture,
  // });
  // const savedSong = await song.save();
  // console.log(savedSong);
  // response.status(201).json(savedSong);
});

songRouter.put("/:id/likes", async (request, response) => {
  const song = await Song.findById(request.params.id);
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  if (song.likes.includes(user._id)) {
    song.likes.splice(song.likes.indexOf(user._id), 1);
  } else {
    song.likes.push(user._id);
  }
  await song.save();
  response.status(200).json(song);
});

songRouter.delete("/:id", async (request, response) => {
  const song = await Song.findById(request.params.id);
  await song.remove();
  response.status(204).end();
});

// genre

songRouter.post("/:id/genres", async (request, response) => {
  const { name } = request.body;
  const song = await Song.findById(request.params.id);
  song.genres.push(name);
  await song.save();
  response.status(201).json(song);
});

module.exports = songRouter;
