import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, "Name must contain at least 3 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    role: z
        .enum(["admin", "recruiter", "candidate"])
        .optional(),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Password is required"),
});