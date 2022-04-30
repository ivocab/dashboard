import axios from "axios";

export const API = "https://api.gooded.xyz/api";

export const axiosInstance = axios.create({
	baseURL: API,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});
