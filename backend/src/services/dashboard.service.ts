import Resume from "../models/Resume";
import User from "../models/User";

export const getDashboardOverview = async (userId: string) => {
    // ===========================
    // User Profile
    // ===========================

    const user = await User.findById(userId).select(
        "name email role createdAt"
    );

    if (!user) {
        throw new Error("User not found");
    }

    // ===========================
    // Resume Statistics
    // ===========================

    const totalResumes = await Resume.countDocuments({
        user: userId,
    });

    /**
     * These are placeholders until the
     * corresponding collections are created.
     */

    const totalAnalyses = 0;

    const totalCoverLetters = 0;

    const totalJobMatches = 0;

    // ===========================
    // Recent Activity
    // ===========================

    const recentResumes = await Resume.find({
        user: userId,
    })
        .sort({
            createdAt: -1,
        })
        .limit(5)
        .select("title createdAt");

    const activities = recentResumes.map((resume) => ({
        id: resume._id.toString(),
        type: "resume",
        title: `Uploaded ${resume.title}`,
        createdAt: resume.createdAt,
    }));

    // ===========================
    // Response
    // ===========================

    return {
        stats: {
            resumes: totalResumes,
            analyses: totalAnalyses,
            coverLetters: totalCoverLetters,
            jobMatches: totalJobMatches,
        },

        activities,

        profile: {
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
    };
};