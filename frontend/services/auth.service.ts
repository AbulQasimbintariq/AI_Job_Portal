import api from "@/lib/axios";
import { AuthResponse } from "@/types/auth";

export const authService = {
    async login(email: string, password: string) {
        const { data } = await api.post<AuthResponse>(
            "api/auth/login",
            {
                email,
                password,
            }
        );

        return data;
    },

    async register(
        name: string,
        email: string,
        password: string
    ) {
        const { data } = await api.post<AuthResponse>(
            "api/auth/register",
            {
                name,
                email,
                password,
            }
        );

        return data;
    },

    async me() {
        const { data } = await api.get("api/auth/me");

        return data;
    },

    async logout() {
        const { data } = await api.post("api/auth/logout");

        return data;
    },
};