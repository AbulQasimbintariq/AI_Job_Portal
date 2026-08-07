import Resume, { IResume } from "../models/Resume";
import { Types } from "mongoose";
import fs from "fs/promises";

interface CreateResumeData {
    user: string | Types.ObjectId;
    originalFileName: string;
    storedFileName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    extractedText: string;
    parsedData: any;
    atsScore?: number;
}

/**
 * =====================================================
 * Create Resume
 * =====================================================
 */
export const createResume = async (
    data: CreateResumeData
): Promise<IResume> => {
    const hasResume = await Resume.exists({
        user: data.user,
    });

    const resume = await Resume.create({
        ...data,
        isDefault: !hasResume,
    });

    return resume;
};

/**
 * =====================================================
 * Get User Resumes
 * =====================================================
 */
export const getUserResumes = async (
    userId: string | Types.ObjectId
): Promise<IResume[]> => {
    return Resume.find({
        user: userId,
    }).sort({
        uploadedAt: -1,
    });
};

/**
 * =====================================================
 * Get Resume By ID
 * =====================================================
 */
export const getResumeById = async (
    resumeId: string,
    userId: string | Types.ObjectId
): Promise<IResume | null> => {
    return Resume.findOne({
        _id: resumeId,
        user: userId,
    });
};

/**
 * =====================================================
 * Set Default Resume
 * =====================================================
 */
export const setDefaultResume = async (
    resumeId: string,
    userId: string | Types.ObjectId
): Promise<IResume | null> => {
    await Resume.updateMany(
        { user: userId },
        { isDefault: false }
    );

    return Resume.findOneAndUpdate(
        {
            _id: resumeId,
            user: userId,
        },
        {
            isDefault: true,
        },
        {
            new: true,
        }
    );
};

/**
 * =====================================================
 * Delete Resume
 * =====================================================
 */
export const deleteResume = async (
    resumeId: string,
    userId: string | Types.ObjectId
): Promise<boolean> => {
    const resume = await Resume.findOne({
        _id: resumeId,
        user: userId,
    });

    if (!resume) {
        return false;
    }

    try {
        await fs.unlink(resume.filePath);
    } catch (err) {
        console.warn(
            "Resume file not found or already deleted:",
            err
        );
    }

    await resume.deleteOne();

    if (resume.isDefault) {
        const latestResume = await Resume.findOne({
            user: userId,
        }).sort({
            uploadedAt: -1,
        });

        if (latestResume) {
            latestResume.isDefault = true;
            await latestResume.save();
        }
    }

    return true;
};

/**
 * =====================================================
 * Update ATS Score
 * =====================================================
 */
export const updateResumeATSScore = async (
    resumeId: string,
    score: number
): Promise<IResume | null> => {
    return Resume.findByIdAndUpdate(
        resumeId,
        {
            atsScore: score,
        },
        {
            new: true,
        }
    );
};
