// 메인 axios 인스턴스 파일
import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_API_URL;

export const axiosInstance = axios.create({
  baseURL,
});                 