const genreRouter = require("express").Router();
const Genre = require("../models/genre");

genreRouter.post("/", async (request, response) => {
  const { name } = request.body;
  const genre = new Genre({ name });
  try {
    const savedGenre = await genre.save();
    response.status(201).send(savedGenre);
  } catch (error) {
    response.status(400).send(error);
  }
});

genreRouter.get("/", async (request, response) => {
  try {
    const genres = await Genre.find();
    response.send(genres);
  } catch (error) {
    response.status(500).send(error);
  }
});

genreRouter.get("/:id", async (request, response) => {
  try {
    const genre = await Genre.findById(request.params.id);
    if (genre) {
      response.send(genre);
    } else {
      response.status(404).send({ error: "Genre not found" });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = genreRouter;
