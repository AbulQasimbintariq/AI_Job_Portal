import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.NEXT_PUBLIC_SITE_URL;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on https://ai-job-portal-nu-gold.vercel.app/`);
    });
});