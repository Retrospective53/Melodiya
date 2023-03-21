import axios from "axios";
const baseUrl = "http://localhost:3003";

const getMusic = async () => {
  const response = await axios.get(`${baseUrl}/api/songs`);
  return response.data;
};

const getAMusic = async () => {
  const response = await axios.get(`${baseUrl}/api/songs/:id`);
  return response.data;
};

const getFile = async (fileId) => {
  const response = await axios.get(`${baseUrl}/api/storage/${fileId}`);
  return response.data;
};

const getFileInfo = async (fileId) => {
  const response = await axios.get(`${baseUrl}/api/storage/${fileId}/info`);
  return response.data;
};

const getDownloadUrlById = async (fileId) => {
  const response = await axios.get(
    `${baseUrl}/api/storage/${fileId}/downloadUrl`
  );
  return response.data;
};

const getSongMetadata = async (song) => {
  const formData = new FormData();
  formData.append("song", song);
  const response = await axios.post(`${baseUrl}/api/songs/metadata`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const uploadSong = async (files, songData) => {
  let progress = 0;

  const config = {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      if (percentCompleted !== progress) {
        progress = percentCompleted;
        console.log(`Uploading: ${progress}%`);
      }
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(
    `${baseUrl}/api/songs`,
    files,
    songData,
    config
  );
  return response.data;
};

export default {
  getMusic,
  getAMusic,
  getSongMetadata,
  uploadSong,
  getFile,
  getFileInfo,
};
