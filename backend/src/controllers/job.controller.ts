import { Request, Response } from "express";
import Job from "../models/Job";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse, errorResponse } from "../utils/response";
import {
    createJobSchema,
    updateJobSchema,
} from "../validators/job.validator";
import { AuthRequest } from "../middleware/auth.middleware";

/**
 * Create Job
 */
export const createJob = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = createJobSchema.parse(req.body);

        const job = await Job.create({
            ...data,
            postedBy: req.user._id,
        });

        return successResponse(
            res,
            "Job created successfully",
            job,
            201
        );
    }
);

/**
 * Get All Jobs
 */
export const getJobs = asyncHandler(
    async (_req: Request, res: Response) => {
        const jobs = await Job.find()
            .populate("postedBy", "name email")
            .populate("company", "name");

        return successResponse(
            res,
            "Jobs fetched successfully",
            jobs
        );
    }
);

/**
 * Get Single Job
 */
export const getJob = asyncHandler(
    async (req: Request, res: Response) => {
        const job = await Job.findById(req.params.id)
            .populate("postedBy", "name email")
            .populate("company", "name");

        if (!job) {
            return errorResponse(
                res,
                "Job not found",
                404
            );
        }

        return successResponse(
            res,
            "Job fetched successfully",
            job
        );
    }
);

/**
 * Update Job
 */
export const updateJob = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = updateJobSchema.parse(req.body);

        const job = await Job.findById(req.params.id);

        if (!job) {
            return errorResponse(res, "Job not found", 404);
        }

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return errorResponse(
                res,
                "Unauthorized",
                403
            );
        }

        Object.assign(job, data);

        await job.save();

        return successResponse(
            res,
            "Job updated successfully",
            job
        );
    }
);

/**
 * Delete Job
 */
export const deleteJob = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return errorResponse(res, "Job not found", 404);
        }

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return errorResponse(
                res,
                "Unauthorized",
                403
            );
        }

        await job.deleteOne();

        return successResponse(
            res,
            "Job deleted successfully"
        );
    }
);