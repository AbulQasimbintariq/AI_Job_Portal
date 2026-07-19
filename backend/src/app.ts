import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.routes";


const app = express();
// app.use("/api/auth", authRoutes);

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
        message: "AI Job Portal API Running 🚀",
    });
});

export default app;
