import axios from "axios";
// Set the base URL for the API
const API_BASE_URL = process.env.REACT_APP_SERVER_URL;
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export default axiosInstance;
