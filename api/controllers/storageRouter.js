const storageRouter = require("express").Router();
const b2Method = require("../storage/backblaze");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mm = require("music-metadata");
const { response, request } = require("express");

storageRouter.get("/:id", async (request, response) => {
  const file = await b2Method.getFileById(request.params.id);
  response.status(200).send(file);
});

storageRouter.get("/:id/info", async (request, response) => {
  const file = await b2Method.getFileInfo(request.params.id);
  response.status(200).json(file);
});

storageRouter.delete("/:id/delete", async (request, response) => {
  const file = await b2Method.deleteFilebyId(request.params.id);
  response.status(204).json({ note: "succesfully deleted" });
});

storageRouter.post(
  "/upload/song",
  upload.single("file"),
  async (request, response) => {
    const filePath = request.file.path;
    const metadata = await mm.parseFile(filePath);
    const duration = Math.round(metadata.format.duration);
    const fileId = await b2Method.uploadFile(
      request.file.originalname,
      filePath
    );

    response.status(201).json({ fileId });
  }
);

storageRouter.post(
  "/upload/image",
  upload.single("file"),
  async (request, response) => {
    const filePath = request.file.path;
    const fileId = await b2Method.uploadFile(
      request.file.originalname,
      filePath
    );

    response.status(201).json({ fileId });
  }
);

module.exports = storageRouter;
