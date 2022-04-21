import { axiosInstance } from "./api";
const api = "/level";

export const levelsService = {
	get: (query) => axiosInstance.get(`${api}?${query}`),
	add: (data) => axiosInstance.post(`${api}`, data),
	del: (id) => axiosInstance.delete(`${api}/${id}`),
};
