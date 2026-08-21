const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, originalName) => {
    return new Promise((resolve, reject) => {
        const safeName = originalName
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9-_]/g, "_");

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                folder: "ai-job-portal/resumes",
                public_id: `${Date.now()}-${safeName}`,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

module.exports = uploadToCloudinary;