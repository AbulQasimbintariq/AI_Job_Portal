import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import app from "../src/app";
import { connectDB } from "../src/config/db";

let isConnected = false;

export default async function handler(req: Request, res: Response) {
    try {
        if (!isConnected) {
            await connectDB();
            isConnected = true;
        }

        return app(req, res);
    } catch (error) {
        console.error("❌ Serverless function error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}