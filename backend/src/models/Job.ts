import mongoose, { Document, Schema } from "mongoose";

export enum JobType {
    FULL_TIME = "Full-Time",
    PART_TIME = "Part-Time",
    INTERNSHIP = "Internship",
    CONTRACT = "Contract",
    REMOTE = "Remote",
}

export interface IJob extends Document {
    title: string;
    company: mongoose.Types.ObjectId;
    description: string;
    requirements: string[];
    responsibilities: string[];
    location: string;
    salary: number;
    experience: string;
    jobType: JobType;
    skills: string[];
    vacancies: number;
    deadline: Date;
    postedBy: mongoose.Types.ObjectId;
    isActive: boolean;
}

const JobSchema = new Schema<IJob>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        requirements: [
            {
                type: String,
            },
        ],

        responsibilities: [
            {
                type: String,
            },
        ],

        location: {
            type: String,
            required: true,
        },

        salary: {
            type: Number,
            required: true,
        },

        experience: {
            type: String,
            required: true,
        },

        jobType: {
            type: String,
            enum: Object.values(JobType),
            required: true,
        },

        skills: [
            {
                type: String,
            },
        ],

        vacancies: {
            type: Number,
            default: 1,
        },

        deadline: {
            type: Date,
            required: true,
        },

        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IJob>("Job", JobSchema);