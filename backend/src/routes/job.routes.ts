import { Router } from "express";
import {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
} from "../controllers/job.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

/**
 * Public Routes
 */
router.get("/", getJobs);
router.get("/:id", getJob);

/**
 * Recruiter Routes
 */
router.post(
    "/",
    protect,
    authorize("recruiter"),
    createJob
);

router.put(
    "/:id",
    protect,
    authorize("recruiter"),
    updateJob
);

router.delete(
    "/:id",
    protect,
    authorize("recruiter"),
    deleteJob
);

export default router;
