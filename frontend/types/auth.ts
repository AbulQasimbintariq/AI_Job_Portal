export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    };
}