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

const deleteSong = async (fileId) => {
  const response = await axios.delete(`${baseUrl}/api/songs/${fileId}`);
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
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const uploadSong = async (files) => {
  // let progress = 0;
  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percentCompleted = Math.round((loaded * 100) / total);
    console.log(`Uploading: ${percentCompleted}%`);
  };

  const config = {
    withCredentials: true,
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(`${baseUrl}/api/songs`, files, config);
  return response.data;
};

// Auth

const login = async (loginData) => {
  const response = await axios.post(`${baseUrl}/api/auth/login`, loginData, {
    withCredentials: true,
  });
  return response.data;
};

// Comment

const sentComment = async (songId, commentData) => {
  const response = await axios.put(
    `${baseUrl}/api/songs/${songId}/comments`,
    commentData,
    { withCredentials: true }
  );
  return response.data;
};

// Likes

const sentLikes = async (songId) => {
  const response = await axios.put(
    `${baseUrl}/api/songs/${songId}/likes`,
    null,
    { withCredentials: true }
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
  getDownloadUrlById,
  deleteSong,
  login,
  sentComment,
  sentLikes,
};
