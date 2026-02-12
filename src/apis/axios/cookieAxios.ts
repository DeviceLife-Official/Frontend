// 쿠키가 필요한 API 전용 axios 인스턴스 (인터셉터 없음)

import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_API_URL;

export const cookieAxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // 쿠키/세션 자동 포함
});
