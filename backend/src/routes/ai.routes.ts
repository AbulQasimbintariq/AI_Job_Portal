import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { uploadResume } from "../middleware/upload.middleware";

import {
    analyzeResumeController,
    tailorResumeController,
    generateCoverLetterController,
    generateInterviewQuestionsController,
    generateJobMatchScoreController,
    analyzeSkillGapController,
    enhanceResumeBulletsController,
    evaluateInterviewAnswerController,
    generateCareerAdviceController,
    recommendJobsController,
    evaluateCandidateController,
    healthController,
    parseResumeController,
    uploadResumeController,
} from "../controllers/ai.controller";

const router = Router();

/**
 * =====================================================
 * AI Health
 * =====================================================
 */
router.get("/health", healthController);

/**
 * =====================================================
 * Resume Analyzer
 * =====================================================
 */
router.post(
    "/analyze-resume",
    protect,
    analyzeResumeController
);

/**
 * =====================================================
 * Resume Tailoring
 * =====================================================
 */
router.post(
    "/tailor-resume",
    protect,
    tailorResumeController
);

/**
 * =====================================================
 * Cover Letter Generator
 * =====================================================
 */
router.post(
    "/generate-cover-letter",
    protect,
    generateCoverLetterController
);

/**
 * =====================================================
 * Interview Questions
 * =====================================================
 */
router.post(
    "/interview-questions",
    protect,
    generateInterviewQuestionsController
);

/**
 * =====================================================
 * Job Match Score
 * =====================================================
 */
router.post(
    "/job-match-score",
    protect,
    generateJobMatchScoreController
);

/**
 * =====================================================
 * Skill Gap Analyzer
 * =====================================================
 */
router.post(
    "/skill-gap",
    protect,
    analyzeSkillGapController
);

/**
 * =====================================================
 * Resume Bullet Enhancer
 * =====================================================
 */
router.post(
    "/enhance-bullets",
    protect,
    enhanceResumeBulletsController
);

/**
 * =====================================================
 * AI Mock Interview
 * =====================================================
 */
router.post(
    "/mock-interview",
    protect,
    evaluateInterviewAnswerController
);

/**
 * =====================================================
 * AI Career Advisor
 * =====================================================
 */
router.post(
    "/career-advice",
    protect,
    generateCareerAdviceController
);

/**
 * =====================================================
 * AI Job Recommendation Engine
 * =====================================================
 */
router.post(
    "/job-recommendations",
    protect,
    recommendJobsController
);

/**
 * =====================================================
 * AI Recruiter Assistant
 * =====================================================
 */
router.post(
    "/recruiter-evaluate",
    protect,
    evaluateCandidateController
);

router.post(
    "/parse-resume",
    protect,
    parseResumeController
);

/**
 * =====================================================
 * AI Resume Upload
 * =====================================================
 */
router.post(
    "/upload-resume",
    protect,
    uploadResume.single("resume"),
    uploadResumeController
);

export default router;
