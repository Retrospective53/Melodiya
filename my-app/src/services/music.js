import axios from "axios";
const baseUrl = "http://localhost:3003";

const getMusic = async () => {
  const response = await axios.get(`${baseUrl}/library.mp3`);
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
  const response = await axios.post(`${baseUrl}/api/songs`, files, songData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default { getMusic, getSongMetadata, uploadSong };
