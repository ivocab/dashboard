import { axiosInstance } from "./api";
const api = "/media/upload";

export const uploadService = {
	upload: (file) => axiosInstance.post(api, file),
};
