// import { Router } from "express";
// import {
//     applyJob,
//     myApplications,
//     getApplicants,
//     updateApplicationStatus,
// } from "../controllers/application.controller";

// import { protect } from "../middleware/auth.middleware";
// import { authorize } from "../middleware/role.middleware";

// const router = Router();

// /**
//  * Candidate Routes
//  */
// router.post(
//     "/",
//     protect,
//     authorize("candidate"),
//     applyJob
// );

// router.get(
//     "/me",
//     protect,
//     authorize("candidate"),
//     myApplications
// );

// /**
//  * Recruiter Routes
//  */
// router.get(
//     "/job/:jobId",
//     protect,
//     authorize("recruiter"),
//     getApplicants
// );

// router.put(
//     "/:id/status",
//     protect,
//     authorize("recruiter"),
//     updateApplicationStatus
// );

// export default router;

import { Router } from "express";
import {
  applyJob,
  myApplications,
  getApplicants,
  updateApplicationStatus,
} from "../controllers/application.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { UserRole } from "../models/User";

const router = Router();

/**
 * Candidate Routes
 */
router.post(
  "/",
  protect,
  authorize(UserRole.CANDIDATE),
  applyJob
);

router.get(
  "/me",
  protect,
  authorize(UserRole.CANDIDATE),
  myApplications
);

/**
 * Recruiter Routes
 */
router.get(
  "/job/:jobId",
  protect,
  authorize(UserRole.RECRUITER),
  getApplicants
);

router.put(
  "/:id/status",
  protect,
  authorize(UserRole.RECRUITER),
  updateApplicationStatus
);

export default router;
