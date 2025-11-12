import axios from 'axios';
// Import our new auto-refreshing client
import apiClient from './apiClient.js'; // Added .js

// Use the default axios instance for public routes like register
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = async (userData) => {
  try {
    // Use the public client, not the one with interceptors
    // UPDATED: Changed URL from '/users/register' to '/auth/register'
    const response = await publicApiClient.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration Failed.';
    throw new Error(message);
  }
};

/**
 * NEW: Login a user
 * This is the function that was missing
 */
export const loginUser = async (credentials) => {
  try {
    const response = await publicApiClient.post('/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Returns { accessToken, refreshToken }
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login Failed.';
    throw new Error(message);
  }
};

/**
 * NEW: Get the current user's profile
 * This MUST use the secure apiClient with interceptors
 */
export const getMe = async () => {
  try {
    const response = await apiClient.get('/users/me');
    // Returns { userId, email, id }
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Could not fetch user profile';
    throw new Error(message);
  }
};