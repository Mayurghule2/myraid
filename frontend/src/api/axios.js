
import axios from "axios";

const API = axios.create({
  baseURL: "https://myraid-veu9.onrender.com/api",
  withCredentials: true,
});

export default API;