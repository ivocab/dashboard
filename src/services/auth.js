import { axiosInstance } from "./api";
const api = "/auth";

export const authService = {
	login: (data) => axiosInstance.post(`${api}/login`, data),
};
