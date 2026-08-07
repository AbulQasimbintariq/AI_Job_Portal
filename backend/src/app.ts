import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jobRoutes from "./routes/job.routes";
import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import applicationRoutes from "./routes/application.routes";
import uploadRoutes from "./routes/upload.routes";
// import resumeRoutes from "./routes/resume.routes";
import aiRoutes from "./routes/ai.routes";


const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

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
// app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);

export default app;

// import { Router } from "express";

// const router = Router();

// router.get("/test", (_req, res) => {
//     res.json({
//         success: true,
//         message: "GET Auth Route Works"
//     });
// });

// router.post("/register", (_req, res) => {
//     res.json({
//         success: true,
//         message: "POST Register Route Works"
//     });
// });

// export default router;