import { createContext, useContext, useState, useEffect } from 'react';
import {
  saveRefreshToken,
  getRefreshToken,
  removeRefreshToken,
} from '../utils/tokenStorage.js'; 
import {
  setMemoryToken,
  clearMemoryToken,
  refreshAccessToken,
} from '../api/apiClient.js'; 
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  // On app load, try to refresh the token
  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        setIsInitialized(true);
        return;
      }

      try {
        // Try to get a new access token
        const { accessToken } = await refreshAccessToken();
        const user = jwtDecode(accessToken);

        setMemoryToken(accessToken);
        setIsAuthenticated(true);
        setUser(user);
      } catch (error) {
        // Refresh failed, clear everything
        removeRefreshToken();
        clearMemoryToken();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (data) => {
    const { accessToken, refreshToken } = data;
    const user = jwtDecode(accessToken);

    // Store tokens
    saveRefreshToken(refreshToken);
    setMemoryToken(accessToken);

    // Update state
    setIsAuthenticated(true);
    setUser(user);
  };

  // Logout function
  const logout = () => {
    // Clear tokens
    removeRefreshToken();
    clearMemoryToken();

    // Update state
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};