import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let token: string | undefined;

        // Bearer Token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Cookie Token (optional)
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(401).json({
                success: false,
                message: "User not found.",
            });
            return;
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};