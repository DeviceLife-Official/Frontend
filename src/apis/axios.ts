// 메인 axios 인스턴스 파일
import axios from 'axios';
import { getAccessToken } from '@/utils/authStorage';

const baseURL = import.meta.env.VITE_SERVER_API_URL;

export const axiosInstance = axios.create({
  baseURL,
});

// 요청 인터셉터: 매 요청 전에 토큰을 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  // 토큰 읽기
  const accessToken = getAccessToken();

  // 토큰이 있으면 Authorization 헤더에 추가
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});                 