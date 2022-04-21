import { axiosInstance } from "./api";
const api = "/user";

export const usersService = {
	get: (query) => axiosInstance.get(`${api}?${query}`),
	add: (data) => axiosInstance.post(`${api}`, data),
	edit: (id, data) => axiosInstance.put(`${api}/${id}`, data),
	del: (id) => axiosInstance.delete(`${api}/${id}`),
};
