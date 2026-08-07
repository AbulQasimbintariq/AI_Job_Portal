import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

/**
 * =====================================================
 * Ensure uploads directory exists
 * =====================================================
 */

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * =====================================================
 * Multer Storage Configuration
 * =====================================================
 */

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },

    filename: (_req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

/**
 * =====================================================
 * Allowed MIME Types
 * =====================================================
 */

const allowedMimeTypes = [
    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * =====================================================
 * File Filter
 * =====================================================
 */

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(
        new Error(
            "Only PDF and DOCX files are allowed."
        )
    );
};

/**
 * =====================================================
 * Upload Middleware
 * =====================================================
 */

export const uploadResume = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});