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
import { UserRole } from "../models/User";

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
  authorize(UserRole.RECRUITER),
  createJob
);

router.put(
  "/:id",
  protect,
  authorize(UserRole.RECRUITER),
  updateJob
);

router.delete(
  "/:id",
  protect,
  authorize(UserRole.RECRUITER),
  deleteJob
);

export default router;
