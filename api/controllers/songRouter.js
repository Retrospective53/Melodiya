const songRouter = require("express").Router();
const Song = require("../models/song");
const Genre = require("../models/genre");
// const b2Method = require("../storage/backblaze");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// const mm = require("music-metadata");

songRouter.get("/", async (request, response) => {
  const songs = await Song.find({});
  response.status(200).json(songs);
});

songRouter.get("/:id", async (request, response) => {
  const song = await Song.findById(request.params.id);
  response.status(200).json(song);
});

songRouter.post("/", async (request, response) => {
  const { title, genres, image, picture } = request.body;

  // const filePath = request.file.path;
  // const metadata = mm.parseFile(filePath);
  // const duration = metadata.format.duration;

  // const fileId = await b2Method.uploadFile(request.file.originalname, filePath);

  const song = new Song({
    title,
    artist,
    genres,
    image,
    fileId,
    duration,
    picture,
  });
  const savedSong = await song.save();
  response.status(201).json(savedSong);
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
