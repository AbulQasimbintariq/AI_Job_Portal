import { Request, Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse, errorResponse } from "../utils/response";
import {
    applyJobSchema,
    updateApplicationStatusSchema,
} from "../validators/application.validator";

/**
 * Candidate applies for a job
 */
export const applyJob = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = applyJobSchema.parse(req.body);

        const job = await Job.findById(data.job);

        if (!job) {
            return errorResponse(res, "Job not found", 404);
        }

        const alreadyApplied = await Application.findOne({
            candidate: req.user._id,
            job: data.job,
        });

        if (alreadyApplied) {
            return errorResponse(
                res,
                "You have already applied",
                400
            );
        }

        const application = await Application.create({
            candidate: req.user._id,
            job: data.job,
            resume: data.resume,
            coverLetter: data.coverLetter,
        });

        return successResponse(
            res,
            "Application submitted successfully",
            application,
            201
        );
    }
);

/**
 * Candidate's applications
 */
export const myApplications = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const applications = await Application.find({
            candidate: req.user._id,
        })
            .populate("job")
            .populate("candidate", "name email");

        return successResponse(
            res,
            "Applications fetched successfully",
            applications
        );
    }
);

/**
 * Recruiter views applicants
 */
export const getApplicants = asyncHandler(
    async (req: Request, res: Response) => {
        const applications = await Application.find({
            job: req.params.jobId,
        })
            .populate("candidate", "name email")
            .populate("job", "title");

        return successResponse(
            res,
            "Applicants fetched successfully",
            applications
        );
    }
);

/**
 * Recruiter updates application status
 */
export const updateApplicationStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const data = updateApplicationStatusSchema.parse(req.body);

        const application = await Application.findById(req.params.id);

        if (!application) {
            return errorResponse(
                res,
                "Application not found",
                404
            );
        }

        application.status = data.status;

        await application.save();

        return successResponse(
            res,
            "Application status updated",
            application
        );
    }
);