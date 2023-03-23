const songRouter = require("express").Router();
const Song = require("../models/song");
const Genre = require("../models/genre");
const User = require("../models/user");
const b2Method = require("../storage/backblaze");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mm = require("music-metadata");
const fs = require("fs");
const middleware = require("../utils/middleware");

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
  middleware.tokenExtractor,
  async (request, response) => {
    // const user = request.user;

    const filePath = request.file.path;
    const metadata = await mm.parseFile(filePath);
    fs.unlink(filePath, (error) => {
      if (error) {
        console.log(error);
      }
    });
    response.status(201).json(metadata);
  }
);

songRouter.post(
  "/",
  upload.array("files"),
  middleware.tokenExtractor,
  async (request, response) => {
    const body = JSON.parse(request.body.files);
    const { title, genres, artist, duration, private } = body;
    // const user = request.user;
    // if (!user) {
    //   return response.status(401).json({ error: "Unauthorized" });
    // }

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

    const songPath = request.files[0].path;

    let picture;
    if (request.files[1]) {
      const imagePath = request.files[1].path;
      picture = await b2Method.uploadFile(
        request.files[1].originalname,
        imagePath
      );
    }

    const fileId = await b2Method.uploadFile(
      request.files[0].originalname,
      songPath
    );
    // const artist = user._id;
    // artist
    const song = new Song({
      title,
      artist,
      genres,
      picture,
      fileId,
      duration,
      private,
    });
    const savedSong = await song.save();
    console.log(savedSong);
    fs.unlink(songPath, (error) => {
      if (error) {
        console.log(error);
      }
    });
    if (request.files[1].path) {
      fs.unlink(request.files[1].path, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
    response.status(201).json(savedSong);
  }
);

songRouter.put(
  "/:id/likes",
  middleware.tokenExtractor,
  async (request, response) => {
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
  }
);

songRouter.put("/:id/comments", async (request, response) => {
  const song = await Song.findById(request.params.id);
});

songRouter.delete("/:id", async (request, response) => {
  const song = await Song.findById(request.params.id);
  const { fileId, picture } = song;

  await b2Method.deleteFilebyId(fileId);
  if (picture) {
    await b2Method.deleteFilebyId(picture);
  }
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
