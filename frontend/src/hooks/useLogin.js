import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/userApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { setMemoryToken } from '../api/apiClient.js';
import { jwtDecode } from 'jwt-decode';

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser, // This is the API call
    onSuccess: (data) => {
      // On success, call the login function from AuthContext
      login(data);
      console.log('Login successful');
    },
    onError: (error) => {
      // Handle login error
      console.error('Login failed:', error.message);
    },
  });
};