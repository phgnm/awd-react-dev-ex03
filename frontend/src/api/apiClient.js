import axios from 'axios';
import { getRefreshToken, removeRefreshToken } from '../utils/tokenStorage';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

let inMemoryAccessToken = null;

export const refreshAccessToken = () => {
    inMemoryAccessToken = null;
}
export const clearMemoryToken = () => {
    inMemoryAccessToken = null;
}
export const setMemoryToken = (token) => {
    inMemoryAccessToken = token;
}

export const getMemoryToken = () => {
    return inMemoryAccessToken;
}

const refreshToken = async () => {
    const currentRefreshToken = getRefreshToken();
    if (!currentRefreshToken) {
        return Promise.reject(new Error('No refresh token available'));
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken: currentRefreshToken,
        });
        const { accessToken } = response.data;

        const userData = jwtDecode(accessToken);

        setMemoryToken(accessToken);

        return { accessToken, userData };
    }
    catch (error) {
        setMemoryToken(null);
        removeRefreshToken();
        return Promise.reject(error);
    }
};

apiClient.interceptors.request.use(
    (config) => {
        const token = getMemoryToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if(error) {
            prom.reject(error);
        }
        else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { accessToken, userData } = await refreshToken();

                window.dispatchEvent(
                    new CustomEvent('tokenRefreshed', {
                        detail: { accessToken, userData },
                    }),
                );

                processQueue(null, accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            }
            catch (refreshError) {
                processQueue(refreshError, null);
                window.dispatchEvent(new Event('logout'));
                return Promise.reject(refreshError);
            }
            finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default apiClient;