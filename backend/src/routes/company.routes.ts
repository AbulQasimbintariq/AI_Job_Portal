import { Router } from "express";

import {
    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
} from "../controllers/company.controller";

import { protect } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

import { UserRole } from "../models/User";

const router = Router();

/*
 Public Routes
*/

router.get("/", getCompanies);

router.get("/:id", getCompany);

/*
 Recruiter/Admin Routes
*/

router.post(
    "/",
    protect,
    authorize(UserRole.RECRUITER, UserRole.ADMIN),
    createCompany
);

router.put(
    "/:id",
    protect,
    authorize(UserRole.RECRUITER, UserRole.ADMIN),
    updateCompany
);

router.delete(
    "/:id",
    protect,
    authorize(UserRole.RECRUITER, UserRole.ADMIN),
    deleteCompany
);

export default router;