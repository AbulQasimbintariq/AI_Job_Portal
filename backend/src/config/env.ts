import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("5000"),
    NODE_ENV: z.string().default("development"),
    MONGODB_URI: z.string().min(1),
    JWT_SECRET: z.string().min(10),
    JWT_EXPIRES_IN: z.string().default("7d")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid Environment Variables");
    process.exit(1);
}

export const env = parsed.data;
