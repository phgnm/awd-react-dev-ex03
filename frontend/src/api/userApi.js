import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, userData, {
            headers: {
                "Content-Type": "application/json"
            },
        });

        return response.data;
    }
    catch (error) {
        const message = error.response?.data?.message || "Registration Failed.";
        throw new Error(message);
    }
};