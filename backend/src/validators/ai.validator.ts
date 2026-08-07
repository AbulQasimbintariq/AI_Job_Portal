import { z } from "zod";

/**
 * =====================================================
 * Resume Analyzer
 * =====================================================
 */
export const analyzeResumeSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),
    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});

/**
 * =====================================================
 * Resume Tailoring
 * =====================================================
 */
export const tailorResumeSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),
    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});

/**
 * =====================================================
 * Cover Letter Generator
 * =====================================================
 */
export const coverLetterSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),
    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
    companyName: z
        .string()
        .min(2, "Company name is required."),
    position: z
        .string()
        .min(2, "Position is required."),
});

/**
 * =====================================================
 * Interview Questions
 * =====================================================
 */
export const interviewQuestionSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),
    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});

/**
 * =====================================================
 * Job Match Score
 * =====================================================
 */
export const jobMatchSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),
    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});

/**
 * =====================================================
 * Skill Gap Analyzer
 * =====================================================
 */
export const skillGapSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),
    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});

/**
 * =====================================================
 * Resume Bullet Enhancer
 * =====================================================
 */
export const resumeBulletSchema = z.object({
    bullets: z
        .array(
            z.string().min(5, "Each bullet must contain at least 5 characters.")
        )
        .min(1, "At least one resume bullet is required.")
        .max(20, "Maximum 20 bullet points are allowed."),

    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});

/**
 * =====================================================
 * AI Mock Interview
 * =====================================================
 */

export const mockInterviewSchema = z.object({
    question: z
        .string()
        .min(10, "Interview question is required."),

    answer: z
        .string()
        .min(20, "Answer must be at least 20 characters."),

    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});


/**
 * =====================================================
 * AI Career Advisor
 * =====================================================
 */

export const careerAdviceSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),

    careerGoal: z
        .string()
        .min(10, "Career goal must be at least 10 characters."),
});

/**
 * =====================================================
 * AI Job Recommendation Engine
 * =====================================================
 */

export const jobRecommendationSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),

    jobs: z
        .array(
            z.object({
                title: z
                    .string()
                    .min(2, "Job title is required."),

                company: z
                    .string()
                    .min(2, "Company name is required."),

                description: z
                    .string()
                    .min(20, "Job description must be at least 20 characters."),
            })
        )
        .min(1, "At least one job is required.")
        .max(20, "Maximum 20 jobs can be analyzed at once."),
});

/**
 * =====================================================
 * AI Recruiter Assistant
 * =====================================================
 */

export const recruiterEvaluationSchema = z.object({
    resume: z
        .string()
        .min(50, "Resume must be at least 50 characters."),

    jobDescription: z
        .string()
        .min(50, "Job description must be at least 50 characters."),
});


/**
 * =====================================================
 * AI Resume Parser
 * =====================================================
 */

export const parseResumeSchema = z.object({
    resumeText: z
        .string()
        .min(50, "Resume text must be at least 50 characters.")
        .max(100000, "Resume text is too large."),
});