import { Schema, model, Types, Document } from "mongoose";

export interface ICompany extends Document {
    name: string;
    logo?: string;
    website?: string;
    location: string;
    industry: string;
    description: string;
    owner: Types.ObjectId;
    employees?: number;
}

const companySchema = new Schema<ICompany>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        logo: {
            type: String,
            default: "",
        },

        website: {
            type: String,
            default: "",
        },

        location: {
            type: String,
            required: true,
        },

        industry: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        employees: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default model<ICompany>("Company", companySchema);