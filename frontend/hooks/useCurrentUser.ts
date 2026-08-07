"use client";

import { useCallback, useEffect, useState } from "react";

import { authService } from "@/services/auth.service";
import { storage } from "@/lib/storage";

export interface CurrentUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export function useCurrentUser() {
    const [user, setUser] = useState<CurrentUser | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);

            const token = storage.getToken();

            if (!token) {
                setUser(null);
                return;
            }

            const response = await authService.me();

            /**
             * Backend Response
             *
             * {
             *   success: true,
             *   data: {
             *      _id,
             *      name,
             *      email,
             *      role,
             *      createdAt
             *   }
             * }
             */

            setUser(response.data);

            setError(null);
        } catch (err) {
            console.error(err);

            storage.removeToken();

            setUser(null);

            setError("Failed to load user.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        user,
        loading,
        error,
        refreshUser: fetchUser,
    };
}