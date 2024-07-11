import axios from "axios";

export const API = "http://localhost:5001/api";

export const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
