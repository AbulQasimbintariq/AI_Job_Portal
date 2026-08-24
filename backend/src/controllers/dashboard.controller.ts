import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { getDashboardOverview } from "../services/dashboard.service";

export const getDashboardStats = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = await getDashboardOverview(req.user._id);

        return successResponse(
            res,
            "Dashboard stats fetched successfully",
            data
        );
    }
);