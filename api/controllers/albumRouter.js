const albumRouter = require("express").Router();
const Album = require("../models/album");
const Song = require("../models/song");

albumRouter.post("/", async (request, response) => {
  const { name, songs, description, picture } = request.body;
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  const album = new Album({
    name,
    description,
    picture,
    createdBy: user._id,
  });
  const savedAlbum = await album.save();
  response.status(201).json(savedAlbum);
});

albumRouter.get("/", async (request, response) => {
  const albums = await Album.find({});
  response.status(200).json(albums);
});

albumRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  const album = await Album.findById(request.params.id);
  if (!album) {
    return response.status(404).json({ error: "Album not found" });
  }
  if (album.createdBy.toString() !== user._id.toString()) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  await album.remove();
  response.status(204).end();
});
