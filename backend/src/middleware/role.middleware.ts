import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole } from "../models/User";

/**
 * Role-based authorization middleware
 *
 * Example:
 * router.post(
 *   "/create-job",
 *   protect,
 *   authorize(UserRole.RECRUITER, UserRole.ADMIN),
 *   createJob
 * );
 */
export const authorize = (...roles: UserRole[]) => {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized. Please login first.",
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "Forbidden. You don't have permission to access this resource.",
            });
            return;
        }

        next();
    };
};