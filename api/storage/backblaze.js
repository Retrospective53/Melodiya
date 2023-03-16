const path = require("path");
require("dotenv").config();
const B2 = require("backblaze-b2");
const endpointURL = "https://s3.us-east-005.backblazeb2.com";
const fs = require("fs");
const BUCKET_ID = process.env.BUCKET_ID;
const { Readable } = require("stream");

const b2 = new B2({
  applicationKeyId: process.env.AWS_ACCESS_KEY_ID,
  applicationKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const bucketList = async () => {
  try {
    await b2.authorize();
    console.log("Authorized successfully!");

    const response = await b2.listBuckets();
    console.log("Bucket list:", response.data.buckets);
    return response.data.buckets;
  } catch (err) {
    console.error("Error:", err);
  }
};

const getBucketId = async (bucketName) => {
  try {
    await b2.authorize();
    console.log("Authorized successfully!");

    const response = await b2.getBucket({ bucketName });
    console.log(response.data.buckets[0].bucketId);
    return response.data.buckets[0].bucketId;
  } catch (err) {
    console.error("Error:", err);
  }
};

const uploadFile = async (fileName, file, mime) => {
  const onUploadProgress = (event) => {
    let progress = 0;
    const percentCompleted = Math.round((event.loaded / event.total) * 100);
    if (percentCompleted !== progress) {
      progress = percentCompleted;
      console.log(`Uploading: ${progress}%`);
    }
  };
  try {
    await b2.authorize();
    console.log("Authorized successfully!");

    const responseUpload = await b2.getUploadUrl({
      bucketId: process.env.BUCKET_ID,
    });
    // console.log(responseUpload.data);
    const { authorizationToken, uploadUrl } = responseUpload.data;

    const data = Buffer.isBuffer(file) ? file : fs.readFileSync(file);
    const response = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken: authorizationToken,
      mime: mime,
      fileName,
      data,
      onUploadProgress,
    });
    console.log("File uploaded successfully:", response.data);
    return response.data.fileId;
  } catch (err) {
    console.error("Error:", err);
  }
};

const getFileById = async (fileId) => {
  try {
    await b2.authorize();
    console.log("Authorized successfully!");

    // download the file to the current directory
    const response = await b2.downloadFileById({
      fileId,
    });

    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

const getFileInfo = async (fileId) => {
  try {
    // Authorize with Backblaze B2
    await b2.authorize();
    console.log("Authorized successfully!");

    const response = await b2.getFileInfo({
      fileId,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

// getFileById(
//   "4_z8e01a377aea4942481620a1b_f1051c760cdbedf29_d20230304_m001625_c005_v0501005_t0044_u01677888985542"
// );

module.exports = {
  bucketList,
  getBucketId,
  uploadFile,
  getFileById,
  getFileInfo,
};
