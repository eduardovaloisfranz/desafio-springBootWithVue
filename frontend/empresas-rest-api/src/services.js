import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  delete(endpoint, body) {
    return axiosInstance.delete(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
};
