import { Router } from "express";

import { uploadResume } from "../middleware/upload.middleware";
import { protect } from "../middleware/auth.middleware";

import {
    uploadResumeController,
    uploadAvatar,
    uploadCompanyLogo,
} from "../controllers/upload.controller";

const router = Router();

/**
 * Resume Upload
 */

router.post(
    "/resume",
    protect,
    uploadResume.single("resume"),
    uploadResumeController
);

/**
 * Avatar Upload
 */

router.post(
    "/avatar",
    protect,
    uploadResume.single("avatar"),
    uploadAvatar
);

/**
 * Company Logo Upload
 */

router.post(
    "/company-logo",
    protect,
    uploadResume.single("logo"),
    uploadCompanyLogo
);

export default router;
