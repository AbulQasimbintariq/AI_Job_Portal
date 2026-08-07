import { z } from "zod";

/**
 * Education Schema
 */
export const educationSchema = z.object({
    degree: z
        .string()
        .min(2, "Degree is required"),

    institution: z
        .string()
        .min(2, "Institution is required"),

    startYear: z
        .number()
        .min(1950)
        .max(new Date().getFullYear() + 10),

    endYear: z
        .number()
        .min(1950)
        .max(new Date().getFullYear() + 10),
});

/**
 * Experience Schema
 */
export const experienceSchema = z.object({
    company: z
        .string()
        .min(2, "Company name is required"),

    position: z
        .string()
        .min(2, "Position is required"),

    startDate: z.coerce.date(),

    endDate: z.coerce.date().optional(),

    currentlyWorking: z
        .boolean()
        .default(false),

    description: z
        .string()
        .max(1000)
        .default(""),
});

/**
 * Project Schema
 */
export const projectSchema = z.object({
    title: z
        .string()
        .min(2, "Project title is required"),

    description: z
        .string()
        .min(5, "Project description is required"),

    technologies: z.array(z.string()).default([]),

    github: z
        .string()
        .url("Invalid GitHub URL")
        .optional()
        .or(z.literal("")),

    liveDemo: z
        .string()
        .url("Invalid Live Demo URL")
        .optional()
        .or(z.literal("")),
});

/**
 * Create Resume Schema
 */
export const createResumeSchema = z.object({
    resumeUrl: z
        .string()
        .url("Invalid Resume URL")
        .optional()
        .or(z.literal("")),

    publicId: z
        .string()
        .optional()
        .or(z.literal("")),

    summary: z
        .string()
        .max(1000)
        .default(""),

    skills: z
        .array(z.string())
        .default([]),

    education: z
        .array(educationSchema)
        .default([]),

    experience: z
        .array(experienceSchema)
        .default([]),

    projects: z
        .array(projectSchema)
        .default([]),
});

/**
 * Update Resume Schema
 */
export const updateResumeSchema =
    createResumeSchema.partial();