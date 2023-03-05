const storageRouter = require("express").Router();
const b2Method = require("../storage/backblaze");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mm = require("music-metadata");

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

module.exports = storageRouter;
