import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import jobRoutes from "./routes/job.routes";
import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import applicationRoutes from "./routes/application.routes";
import uploadRoutes from "./routes/upload.routes";
import aiRoutes from "./routes/ai.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.error("❌ CORS blocked:", origin);

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Explicitly handle CORS preflight

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "AI Job Portal API Running 🚀",
    });
});

app.use("/api/upload", uploadRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;