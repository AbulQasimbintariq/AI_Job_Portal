import mongoose, { Document, Schema } from "mongoose";

export enum ApplicationStatus {
    PENDING = "Pending",
    REVIEWING = "Reviewing",
    SHORTLISTED = "Shortlisted",
    INTERVIEW = "Interview",
    HIRED = "Hired",
    REJECTED = "Rejected",
}

export interface IApplication extends Document {
    candidate: mongoose.Types.ObjectId;
    job: mongoose.Types.ObjectId;
    resume?: string;
    coverLetter?: string;
    status: ApplicationStatus;
}

const ApplicationSchema = new Schema<IApplication>(
    {
        candidate: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        resume: {
            type: String,
            default: "",
        },

        coverLetter: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: Object.values(ApplicationStatus),
            default: ApplicationStatus.PENDING,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate applications
ApplicationSchema.index(
    { candidate: 1, job: 1 },
    { unique: true }
);

export default mongoose.model<IApplication>(
    "Application",
    ApplicationSchema
);