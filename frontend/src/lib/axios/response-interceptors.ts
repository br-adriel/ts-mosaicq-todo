import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from '.';

export const refreshTokensWhen401 = async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean;
  };

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const response = await api.post<LoginResponse>('auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
      });

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        originalRequest.headers!.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      }
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
};
