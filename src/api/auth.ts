// src/api/auth.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://localhost:5001/api'; // Change this to your IP address if testing on physical device

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshTokens = async (refreshToken: string) => {
    try {
      console.log('Attempting to refresh token');
      const response = await api.post('/auth/refresh', { refreshToken });
      const { accessToken } = response.data;
      
      await SecureStore.setItemAsync('accessToken', accessToken);
      console.log('New access token stored');
      
      return accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  };

// src/api/auth.ts
export const getStoredAuth = async () => {
  try {
    console.log('Checking stored auth state...');
    const [accessToken, refreshToken, userStr] = await Promise.all([
      SecureStore.getItemAsync('accessToken'),
      SecureStore.getItemAsync('refreshToken'),
      SecureStore.getItemAsync('user')
    ]);

    if (!accessToken || !refreshToken) {
      console.log('No tokens found in storage');
      return null;
    }

    console.log('Found tokens, verifying...');

    try {
      // Try to verify access token
      const response = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      console.log('Access token is valid', response.data);
      return {
        accessToken,
        refreshToken,
        user: response.data.user
      };
    } catch (verifyError) {
      console.log('Access token expired, attempting refresh...', verifyError);
      
      try {
        // Try to refresh the token
        const refreshResponse = await api.post('/auth/refresh', { refreshToken });
        const newAccessToken = refreshResponse.data.accessToken;
        
        // Store new access token
        await SecureStore.setItemAsync('accessToken', newAccessToken);
        
        // Verify the new token
        const verifyResponse = await api.get('/auth/verify', {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        });
        
        console.log('Successfully refreshed and verified token');
        return {
          accessToken: newAccessToken,
          refreshToken,
          user: verifyResponse.data.user
        };
      } catch (refreshError) {
        console.log('Refresh failed, clearing tokens');
        await Promise.all([
          SecureStore.deleteItemAsync('accessToken'),
          SecureStore.deleteItemAsync('refreshToken'),
          SecureStore.deleteItemAsync('user')
        ]);
        return null;
      }
    }
  } catch (error) {
    console.error('Error in getStoredAuth:', error);
    return null;
  }
};
  
export const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = response.data;
      
      console.log('Login successful, storing tokens');
      // Store tokens sequentially to ensure they're saved
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      
      // Verify tokens were stored
      const storedAccessToken = await SecureStore.getItemAsync('accessToken');
      console.log('Tokens stored successfully:', !!storedAccessToken);
  
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  

  export const register = async (email: string, password: string) => {
    try {
      // Step 1: Register the user
      const response = await api.post('/auth/register', { email, password });
      const { user } = response.data;
  
      // Step 2: Automatically login after registration
      const loginResponse = await login(email, password);
  
      // Step 3: Return the login response (tokens and user details)
      return loginResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  };
  

export const logout = async () => {
    console.log('Logging out, clearing tokens');
    await Promise.all([
      SecureStore.deleteItemAsync('accessToken'),
      SecureStore.deleteItemAsync('refreshToken'),
      SecureStore.deleteItemAsync('user')
    ]);
  };
