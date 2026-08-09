import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
    ADMIN = "admin",
    RECRUITER = "recruiter",
    CANDIDATE = "candidate",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CANDIDATE,
        },

        avatar: String,

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>("User", UserSchema);
