import dotenv from "dotenv";
dotenv.config();

import app from "../src/app";
import { connectDB } from "../src/config/db";

let isConnected = false;

const connectDatabase = async () => {
    if (isConnected) {
        return;
    }

    await connectDB();
    isConnected = true;
};

export default async function handler(req: any, res: any) {
    try {
        await connectDatabase();

        return app(req, res);
    } catch (error) {
        console.error("❌ Serverless function error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}