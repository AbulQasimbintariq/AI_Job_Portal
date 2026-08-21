const uploadToCloudinary = require("../utils/uploadToCloudinary");

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume file.",
            });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            req.file.originalname
        );

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully.",
            file: {
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    } catch (error) {
        console.error("Resume upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload resume.",
        });
    }
};

module.exports = {
    uploadResume,
};
    