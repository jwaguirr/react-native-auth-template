import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://localhost:5001/api';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add token to requests
client.interceptors.request.use(
    async (config) => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        console.log('Adding access token to request');
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Handle token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log('Access token expired, attempting refresh...');
  
        try {
          const refreshToken = await SecureStore.getItemAsync('refreshToken');
          if (!refreshToken) throw new Error('No refresh token found');
  
          const response = await axios.post('http://localhost:5001/api/auth/refresh', {
            refreshToken
          });
  
          const { accessToken } = response.data;
          console.log('Got new access token');
  
          await SecureStore.setItemAsync('accessToken', accessToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.log('Refresh failed - logging out');
          await SecureStore.deleteItemAsync('accessToken');
          await SecureStore.deleteItemAsync('refreshToken');
          throw refreshError;
        }
      }
  
      return Promise.reject(error);
    }
  );