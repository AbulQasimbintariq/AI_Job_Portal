import { z } from "zod";

export const applyJobSchema = z.object({
    job: z.string().min(1, "Job ID is required"),

    resume: z.string().optional(),

    coverLetter: z.string().optional(),
});


export enum ApplicationStatus {
    PENDING = "Pending",
    REVIEWING = "Reviewing",
    SHORTLISTED = "Shortlisted",
    INTERVIEW = "Interview",
    HIRED = "Hired",
    REJECTED = "Rejected",
}

export const updateApplicationStatusSchema = z.object({
    status: z.enum(ApplicationStatus)
});