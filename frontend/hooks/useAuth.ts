"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { storage } from "@/lib/storage";
// import { useAuthContext } from "@/contexts/AuthContext";

export function useAuth() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function login(
        email: string,
        password: string
    ) {
        setLoading(true);

        try {
            const response =
                await authService.login(
                    email,
                    password
                );

            storage.setToken(
                response.data.token
            );

            router.push("/dashboard");
        } finally {
            setLoading(false);
        }
    }

    async function register(
        name: string,
        email: string,
        password: string
    ) {
        setLoading(true);

        try {
            const response =
                await authService.register(
                    name,
                    email,
                    password
                );

            storage.setToken(
                response.data.token
            );

            router.push("/dashboard");
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        storage.removeToken();

        router.push("/login");
    }

    return {
        loading,
        login,
        register,
        logout,
        // useAuthContext,
    };
}