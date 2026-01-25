// 메인 axios 인스턴스 파일

import axios from 'axios';
import { setupRequestInterceptor, setupResponseInterceptor } from '@/apis/axios/interceptors';

const baseURL = import.meta.env.VITE_SERVER_API_URL;

export const axiosInstance = axios.create({
  baseURL,
});

// 인터셉터 설정
setupRequestInterceptor(axiosInstance);
setupResponseInterceptor(axiosInstance);                 