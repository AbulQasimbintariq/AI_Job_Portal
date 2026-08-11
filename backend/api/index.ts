import dotenv from "dotenv";
dotenv.config();

import type { Request, Response } from "express";
import app from "../src/app";
import { connectDB } from "../src/config/db";

let dbPromise: ReturnType<typeof connectDB> | null = null;

export default async function handler(
    req: Request,
    res: Response
) {
    try {
        if (!dbPromise) {
            dbPromise = connectDB();
        }

        await dbPromise;

        return app(req, res);
    } catch (error) {
        console.error("❌ Vercel Function Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
