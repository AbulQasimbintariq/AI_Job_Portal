import { Response } from "express";
import fs from "fs";

import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../middleware/auth.middleware";
import { successResponse, errorResponse } from "../utils/response";

/**
 * Upload Resume
 */


export const uploadResumeController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.file)
        
        {
            return errorResponse(
                res,
                "No file uploaded",
                400
            );
        }

        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type: "raw",
                folder: "ai-job-portal/resumes",
            }
        );

        fs.unlinkSync(req.file.path);

        return successResponse(
            res,
            "Resume uploaded successfully",
            {
                url: result.secure_url,
                public_id: result.public_id,
            }
        );
    } catch (error) {
        console.error(error);

        return errorResponse(
            res,
            "Upload failed",
            500
        );
    }
};

/**
 * Upload Profile Image
 */

export const uploadAvatar = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.file) {
            return errorResponse(
                res,
                "No image uploaded",
                400
            );
        }

        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "ai-job-portal/avatars",
            }
        );

        fs.unlinkSync(req.file.path);

        return successResponse(
            res,
            "Avatar uploaded successfully",
            {
                url: result.secure_url,
                public_id: result.public_id,
            }
        );
    } catch (error) {
        console.error(error);

        return errorResponse(
            res,
            "Upload failed",
            500
        );
    }
};

/**
 * Upload Company Logo
 */

export const uploadCompanyLogo = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.file) {
            return errorResponse(
                res,
                "No image uploaded",
                400
            );
        }

        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "ai-job-portal/company-logos",
            }
        );

        fs.unlinkSync(req.file.path);

        return successResponse(
            res,
            "Company logo uploaded successfully",
            {
                url: result.secure_url,
                public_id: result.public_id,
            }
        );
    } catch (error) {
        console.error(error);

        return errorResponse(
            res,
            "Upload failed",
            500
        );
    }
};