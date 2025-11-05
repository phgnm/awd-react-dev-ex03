import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/userApi";

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,

        onSuccess: (data) => {
            console.log("User registered successfully:", data);
        },

        onError: (error) => {
            console.error("Registration failed:", error.message);
        },
    });
};