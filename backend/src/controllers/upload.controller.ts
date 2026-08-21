import { Response } from "express";
import { UploadApiResponse } from "cloudinary";

import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../middleware/auth.middleware";
import { successResponse, errorResponse } from "../utils/response";

/**
 * Upload a Buffer to Cloudinary
 *
 * This is required because Multer is using memoryStorage().
 * The file is available as req.file.buffer instead of req.file.path.
 */
const uploadBufferToCloudinary = (
    buffer: Buffer,
    options: {
        folder: string;
        resource_type: "image" | "raw";
    }
): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: options.folder,
                resource_type: options.resource_type,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!result) {
                    reject(new Error("Cloudinary upload returned no result."));
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

/**
 * Upload Resume
 *
 * POST /api/upload/resume
 *
 * Form field:
 * resume
 */
export const uploadResumeController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.file) {
            return errorResponse(
                res,
                "No resume file uploaded",
                400
            );
        }

        const result = await uploadBufferToCloudinary(
            req.file.buffer,
            {
                folder: "ai-job-portal/resumes",
                resource_type: "raw",
            }
        );

        return successResponse(
            res,
            "Resume uploaded successfully",
            {
                url: result.secure_url,
                public_id: result.public_id,
            }
        );
    } catch (error) {
        console.error("Resume upload error:", error);

        return errorResponse(
            res,
            "Resume upload failed",
            500
        );
    }
};

/**
 * Upload Profile Image
 *
 * POST /api/upload/avatar
 *
 * Form field:
 * avatar
 */
export const uploadAvatar = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.file) {
            return errorResponse(
                res,
                "No avatar image uploaded",
                400
            );
        }

        const result = await uploadBufferToCloudinary(
            req.file.buffer,
            {
                folder: "ai-job-portal/avatars",
                resource_type: "image",
            }
        );

        return successResponse(
            res,
            "Avatar uploaded successfully",
            {
                url: result.secure_url,
                public_id: result.public_id,
            }
        );
    } catch (error) {
        console.error("Avatar upload error:", error);

        return errorResponse(
            res,
            "Avatar upload failed",
            500
        );
    }
};

/**
 * Upload Company Logo
 *
 * POST /api/upload/company-logo
 *
 * Form field:
 * logo
 */
export const uploadCompanyLogo = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.file) {
            return errorResponse(
                res,
                "No company logo uploaded",
                400
            );
        }

        const result = await uploadBufferToCloudinary(
            req.file.buffer,
            {
                folder: "ai-job-portal/company-logos",
                resource_type: "image",
            }
        );

        return successResponse(
            res,
            "Company logo uploaded successfully",
            {
                url: result.secure_url,
                public_id: result.public_id,
            }
        );
    } catch (error) {
        console.error("Company logo upload error:", error);

        return errorResponse(
            res,
            "Company logo upload failed",
            500
        );
    }
};