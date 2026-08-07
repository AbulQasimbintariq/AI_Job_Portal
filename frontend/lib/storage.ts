const TOKEN_KEY = "accessToken";

export const storage = {
    getToken() {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken(token: string) {
        if (typeof window === "undefined") return;
        localStorage.setItem(TOKEN_KEY, token);
    },

    removeToken() {
        if (typeof window === "undefined") return;
        localStorage.removeItem(TOKEN_KEY);
    },
};