import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { extractResumeText } from "../services/resumeParser.service";

// import { parseResume } from "../services/ai.service";

// import fs from "fs";
// import path from "path";

// import Resume from "../models/resume.model";

// import {
//     createResume,
//     getUserResumes,
//     getResumeById,
//     setDefaultResume,
//     deleteResume,
// } from "../services/resume.service";

import {
    successResponse,
    errorResponse,
} from "../utils/response";

import {
    analyzeResumeSchema,
    tailorResumeSchema,
    coverLetterSchema,
    interviewQuestionSchema,
    jobMatchSchema,
    skillGapSchema,
    resumeBulletSchema,
    mockInterviewSchema,
    careerAdviceSchema,
    jobRecommendationSchema,
    recruiterEvaluationSchema,
    parseResumeSchema,
} from "../validators/ai.validator";

import {
    analyzeResume,
    tailorResume,
    generateCoverLetter,
    generateInterviewQuestions,
    generateJobMatchScore,
    analyzeSkillGap,
    enhanceResumeBullets,
    evaluateInterviewAnswer,
    generateCareerAdvice,
    recommendJobs,
    evaluateCandidate,
    parseResume,
} from "../services/ai.service";

/**
 * =====================================================
 * Resume Analyzer
 * =====================================================
 */
export const analyzeResumeController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = analyzeResumeSchema.parse(req.body);

        const result = await analyzeResume(
            data.resume,
            data.jobDescription
        );

        return successResponse(
            res,
            "Resume analyzed successfully",
            result
        );
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
});

/**
 * =====================================================
 * Resume Tailoring
 * =====================================================
 */
export const tailorResumeController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = tailorResumeSchema.parse(req.body);

        const result = await tailorResume(
            data.resume,
            data.jobDescription
        );

        return successResponse(
            res,
            "Resume tailored successfully",
            result
        );
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
});

/**
 * =====================================================
 * Cover Letter Generator
 * =====================================================
 */
export const generateCoverLetterController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = coverLetterSchema.parse(req.body);

        const result = await generateCoverLetter(
            data.resume,
            data.jobDescription,
            data.companyName,
            data.position
        );

        return successResponse(
            res,
            "Cover letter generated successfully",
            result
        );
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
});

/**
 * =====================================================
 * Interview Questions
 * =====================================================
 */
export const generateInterviewQuestionsController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = interviewQuestionSchema.parse(req.body);

        const result = await generateInterviewQuestions(
            data.resume,
            data.jobDescription
        );

        return successResponse(
            res,
            "Interview questions generated successfully",
            result
        );
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
});

/**
 * =====================================================
 * Job Match Score
 * =====================================================
 */
export const generateJobMatchScoreController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = jobMatchSchema.parse(req.body);

        const result = await generateJobMatchScore(
            data.resume,
            data.jobDescription
        );

        return successResponse(
            res,
            "Job match score generated successfully",
            result
        );
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
});

/**
 * =====================================================
 * Skill Gap Analyzer
 * =====================================================
 */
export const analyzeSkillGapController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = skillGapSchema.parse(req.body);

        const result = await analyzeSkillGap(
            data.resume,
            data.jobDescription
        );

        return successResponse(
            res,
            "Skill gap analyzed successfully",
            result
        );
    } catch (error: any) {
        return errorResponse(res, error.message, 500);
    }
});

/**
 * =====================================================
 * Resume Bullet Enhancer
 * =====================================================
 */
export const enhanceResumeBulletsController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = resumeBulletSchema.parse(req.body);

        const result = await enhanceResumeBullets(
            data.bullets,
            data.jobDescription
        );

        return successResponse(
            res,
            "Resume bullets enhanced successfully",
            result
        );
    } catch (error: any) {
        return errorResponse(
            res,
            error.message || "Failed to enhance resume bullets",
            500
        );
    }
});

/**
 * =====================================================
 * AI Health
 * =====================================================
 */
export const healthController = asyncHandler(async (_req: Request, res: Response) => {
    return successResponse(res, "AI Service is running", {
        provider: "Google Gemini",
        model: "gemini-3.6-flash",
        status: "online",
    });
});

/**
 * =====================================================
 * AI Mock Interview Evaluator
 * =====================================================
 */

export const evaluateInterviewAnswerController = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const data = mockInterviewSchema.parse(req.body);

            const result = await evaluateInterviewAnswer(
                data.question,
                data.answer,
                data.jobDescription
            );

            return successResponse(
                res,
                "Interview answer evaluated successfully",
                result
            );
        } catch (error: any) {
            return errorResponse(
                res,
                error.message || "Failed to evaluate interview answer",
                500
            );
        }
    }
);


/**
 * =====================================================
 * AI Career Advisor
 * =====================================================
 */

export const generateCareerAdviceController = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const data = careerAdviceSchema.parse(req.body);

            const result = await generateCareerAdvice(
                data.resume,
                data.careerGoal
            );

            return successResponse(
                res,
                "Career advice generated successfully",
                result
            );
        } catch (error: any) {
            return errorResponse(
                res,
                error.message || "Failed to generate career advice",
                500
            );
        }
    }
);

/**
 * =====================================================
 * AI Job Recommendation Engine
 * =====================================================
 */

export const recommendJobsController = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const data = jobRecommendationSchema.parse(req.body);

            const result = await recommendJobs(
                data.resume,
                data.jobs
            );

            return successResponse(
                res,
                "Job recommendations generated successfully",
                result
            );
        } catch (error: any) {
            return errorResponse(
                res,
                error.message || "Failed to generate job recommendations",
                500
            );
        }
    }
);

/**
 * =====================================================
 * AI Recruiter Assistant
 * =====================================================
 */

export const evaluateCandidateController = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const data = recruiterEvaluationSchema.parse(req.body);

            const result = await evaluateCandidate(
                data.resume,
                data.jobDescription
            );

            return successResponse(
                res,
                "Candidate evaluated successfully",
                result
            );
        } catch (error: any) {
            return errorResponse(
                res,
                error.message || "Failed to evaluate candidate",
                500
            );
        }
    }
);

/**
 * =====================================================
 * AI Resume Parser
 * =====================================================
 */

export const parseResumeController = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const data = parseResumeSchema.parse(req.body);

            const result = await parseResume(
                data.resumeText
            );

            return successResponse(
                res,
                "Resume parsed successfully",
                result
            );
        } catch (error: any) {
            return errorResponse(
                res,
                error.message || "Failed to parse resume",
                500
            );
        }
    }
);


/**
 * =====================================================
 * Upload Resume Controller
 * =====================================================
 */

export const uploadResumeController = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return errorResponse(
                    res,
                    "Resume file is required.",
                    400
                );
            }

            // Extract text from uploaded file
            const resumeText = await extractResumeText(
                req.file.path
            );

            // Parse with AI
            const parsedResume = await parseResume(
                resumeText
            );

            return successResponse(
                res,
                "Resume uploaded and parsed successfully",
                {
                    extractedText: resumeText,
                    parsedResume,
                }
            );
        } catch (error: any) {
            console.error(
                "Upload Resume Error:",
                error
            );

            return errorResponse(
                res,
                error.message ||
                "Failed to upload and parse resume.",
                500
            );
        }
    }
);