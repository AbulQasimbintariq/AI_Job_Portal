import multer from "multer";

const allowedMimeTypes = [
    // Resume
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Images
    "image/jpeg",
    "image/png",
    "image/webp",
];

const fileFilter: multer.Options["fileFilter"] = (
    _req,
    file,
    callback
) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
        return;
    }

    callback(
        new Error(
            "Invalid file type. Allowed files are PDF, DOC, DOCX, JPG, PNG, and WEBP."
        )
    );
};

const storage = multer.memoryStorage();

export const uploadResume = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});