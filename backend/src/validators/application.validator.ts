import { z } from "zod";

export const applyJobSchema = z.object({
    job: z.string().min(1, "Job ID is required"),

    resume: z.string().optional(),

    coverLetter: z.string().optional(),
});

export const updateApplicationStatusSchema = z.object({
    status: z.enum([
        "Pending",
        "Reviewing",
        "Shortlisted",
        "Interview",
        "Hired",
        "Rejected",
    ]),
});