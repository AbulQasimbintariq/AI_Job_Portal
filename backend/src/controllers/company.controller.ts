import { Response } from "express";
import Company from "../models/Company";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/auth.middleware";

/**
 * Create Company
 */
export const createCompany = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const {
            name,
            website,
            location,
            industry,
            description,
        } = req.body;

        const existingCompany = await Company.findOne({ name });

        if (existingCompany) {
            return errorResponse(res, "Company already exists", 409);
        }

        const company = await Company.create({
            name,
            website,
            location,
            industry,
            description,
            owner: req.user._id,
        });

        return successResponse(
            res,
            "Company created successfully",
            company,
            201
        );
    }
);

/**
 * Get All Companies
 */
export const getCompanies = asyncHandler(
    async (_req, res: Response) => {
        const companies = await Company.find().populate(
            "owner",
            "name email"
        );

        return successResponse(
            res,
            "Companies fetched successfully",
            companies
        );
    }
);

/**
 * Get Single Company
 */
export const getCompany = asyncHandler(
    async (req, res: Response) => {
        const company = await Company.findById(req.params.id).populate(
            "owner",
            "name email"
        );

        if (!company) {
            return errorResponse(res, "Company not found", 404);
        }

        return successResponse(
            res,
            "Company fetched successfully",
            company
        );
    }
);

/**
 * Update Company
 */
export const updateCompany = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return errorResponse(res, "Company not found", 404);
        }

        if (company.owner.toString() !== req.user._id.toString()) {
            return errorResponse(res, "Unauthorized", 403);
        }

        Object.assign(company, req.body);

        await company.save();

        return successResponse(
            res,
            "Company updated successfully",
            company
        );
    }
);

/**
 * Delete Company
 */
export const deleteCompany = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return errorResponse(res, "Company not found", 404);
        }

        if (company.owner.toString() !== req.user._id.toString()) {
            return errorResponse(res, "Unauthorized", 403);
        }

        await company.deleteOne();

        return successResponse(
            res,
            "Company deleted successfully"
        );
    }
);