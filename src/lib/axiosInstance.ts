import axios from "axios";
// Set the base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Replace with your API base URL
});

export default axiosInstance;
