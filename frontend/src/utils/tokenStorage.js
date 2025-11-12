const REFRESH_TOKEN_KEY = 'my_refresh_token';

export const saveRefreshToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
};

export const getRefreshToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
}

export const removeRefreshToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
}