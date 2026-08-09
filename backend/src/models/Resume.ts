import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEducation {
    degree: string;
    institution: string;
    startYear: number;
    endYear: number;
}

export interface IExperience {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    currentlyWorking: boolean;
    description: string;
}

export interface IProject {
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    liveDemo?: string;
}

export interface IResume extends Document {
    user: Types.ObjectId;
    resumeUrl: string;
    publicId: string;
    summary: string;
    skills: string[];
    education: IEducation[];
    experience: IExperience[];
    projects: IProject[];
    createdAt: Date;
    updatedAt: Date;
    filePath: string;
    isDefault: true;
    title: string;
}

const EducationSchema = new Schema<IEducation>(
    {
        degree: {
            type: String,
            required: true,
            trim: true,
        },
        institution: {
            type: String,
            required: true,
            trim: true,
        },
        startYear: {
            type: Number,
            required: true,
        },
        endYear: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const ExperienceSchema = new Schema<IExperience>(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        currentlyWorking: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const ProjectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        technologies: [
            {
                type: String,
                trim: true,
            },
        ],
        github: {
            type: String,
            default: "",
        },
        liveDemo: {
            type: String,
            default: "",
        },
    },
    {
        _id: false,
    }
);

const ResumeSchema = new Schema<IResume>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        resumeUrl: {
            type: String,
            default: "",
        },

        publicId: {
            type: String,
            default: "",
        },

        summary: {
            type: String,
            default: "",
        },

        skills: [
            {
                type: String,
                trim: true,
            },
        ],

        education: [EducationSchema],

        experience: [ExperienceSchema],

        projects: [ProjectSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IResume>(
    "Resume",
    ResumeSchema
);
