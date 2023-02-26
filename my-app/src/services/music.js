import axios from "axios";
const baseUrl = "http://localhost:3003/library.mp3";

const getMusic = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getMusic };
