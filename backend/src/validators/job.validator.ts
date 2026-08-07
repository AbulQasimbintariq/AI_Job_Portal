import { z } from "zod";

export const createJobSchema = z.object({
    title: z.string().min(3),

    company: z.string().min(2),

    description: z.string().min(20),

    requirements: z.array(z.string()),

    responsibilities: z.array(z.string()),

    location: z.string(),

    salary: z.number(),

    experience: z.string(),

    jobType: z.enum([
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Remote",
    ]),

    skills: z.array(z.string()),

    vacancies: z.number().min(1),

    deadline: z.string(),
});

export const updateJobSchema = createJobSchema.partial();
