//  import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import jobRoutes from "./routes/job.routes";
// import authRoutes from "./routes/auth.routes";
// import companyRoutes from "./routes/company.routes";
// import applicationRoutes from "./routes/application.routes";
// import uploadRoutes from "./routes/upload.routes";
// import aiRoutes from "./routes/ai.routes";
// import dashboardRoutes from "./routes/dashboard.routes";

// const app = express();

// /*
// |--------------------------------------------------------------------------
// | CORS
// |--------------------------------------------------------------------------
// */
// const allowedOrigins = [
//     "http://localhost:3000",
//     process.env.FRONTEND_URL,
// ].filter(Boolean);

// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 callback(new Error(`CORS blocked origin: ${origin}`));
//             }
//         },
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );
// /*
// |--------------------------------------------------------------------------
// | Body Parsers
// |--------------------------------------------------------------------------
// */

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// /*
// |--------------------------------------------------------------------------
// | Health Check
// |--------------------------------------------------------------------------
// */

// app.get("/", (_req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "AI Job Portal API Running 🚀",
//     });
// });

// /*
// |--------------------------------------------------------------------------
// | API Routes
// |--------------------------------------------------------------------------
// */

// app.use("/api/upload", uploadRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/companies", companyRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/dashboard", dashboardRoutes);

// /*
// |--------------------------------------------------------------------------
// | 404 Handler
// |--------------------------------------------------------------------------
// */

// app.use((_req, res) => {
//     res.status(404).json({
//         success: false,
//         message: "API route not found",
//     });
// });

// /*
// |--------------------------------------------------------------------------
// | Global Error Handler
// |--------------------------------------------------------------------------
// */

// app.use(
//     (
//         err: Error,
//         _req: express.Request,
//         res: express.Response,
//         _next: express.NextFunction
//     ) => {
//         console.error("Global API Error:", err);

//         res.status(500).json({
//             success: false,
//             message: err.message || "Internal server error",
//         });
//     }
// );

// export default app;



// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import jobRoutes from "./routes/job.routes";
// import authRoutes from "./routes/auth.routes";
// import companyRoutes from "./routes/company.routes";
// import applicationRoutes from "./routes/application.routes";
// import uploadRoutes from "./routes/upload.routes";
// import aiRoutes from "./routes/ai.routes";

// const app = express();

// const allowedOrigins = [
//     "http://localhost:3000",
//     process.env.FRONTEND_URL,
// ].filter(Boolean) as string[];

// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 callback(new Error("Not allowed by CORS"));
//             }
//         },
//         credentials: true,
//     })
// );

// app.use(express.json());
// app.use(cookieParser());

// app.get("/", (_req, res) => {
//     res.json({
//         success: true,
//         message: "AI Job Portal API Running 🚀",
//     });
// });

// app.use("/api/upload", uploadRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/companies", companyRoutes);
// app.use("/api/ai", aiRoutes);

// export default app;

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
    "https://ai-job-portal-lhes.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an Origin header
            // such as Postman/server-to-server requests.
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
app.options("*", cors());

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