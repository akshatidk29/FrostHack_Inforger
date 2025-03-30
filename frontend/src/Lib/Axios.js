import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://192.168.172.158:5001/Api",
    withCredentials: true,
});
  