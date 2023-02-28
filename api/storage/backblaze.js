const path = require("path");
require("dotenv").config({ path: `${__dirname}/../.env` });
const B2 = require("backblaze-b2");
const endpointURL = "https://s3.us-east-005.backblazeb2.com";
const fs = require("fs");

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
  } catch (err) {
    console.error("Error:", err);
  }
};

const uploadFile = async () => {
  try {
    await b2.authorize();
    console.log("Authorized successfully!");

    const responseUpload = await b2.getUploadUrl({
      bucketId: process.env.BUCKET_ID,
    });
    // console.log(responseUpload.data);
    const { authorizationToken, uploadUrl } = responseUpload.data;

    const data = fs.readFileSync("./Cover.jpg");
    const response = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken: authorizationToken,
      mime: "image/jpeg",
      fileName: "IbaraKasen.jpg",
      data,
      onUploadProgress: null,
    });
    console.log("File uploaded successfully:", response.data);
  } catch (err) {
    console.error("Error:", err);
  }
};

uploadFile();
