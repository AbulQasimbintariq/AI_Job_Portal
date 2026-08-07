import { Request, Response } from "express";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import {
    comparePassword,
    hashPassword,
} from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";
import {
    successResponse,
    errorResponse,
} from "../utils/response";
import {
    loginSchema,
    registerSchema,
} from "../validators/auth.validator";
import { AuthRequest } from "../middleware/auth.middleware";

/**
 * Register User
 */
export const register = asyncHandler(
    async (req: Request, res: Response) => {
        const data = registerSchema.parse(req.body);

        const existingUser = await User.findOne({
            email: data.email,
        });

        if (existingUser) {
            return errorResponse(
                res,
                "User already exists",
                409
            );
        }

        const hashedPassword = await hashPassword(
            data.password
        );

        const user = await User.create({
            ...data,
            password: hashedPassword,
        });

        const token = generateToken(user._id.toString());

        return successResponse(
            res,
            "Registration successful",
            {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                },
            },
            201
        );
    }
);

/**
 * Login User
 */

// export const login = asyncHandler(
//     async (req: Request, res: Response) => {
//         const data = loginSchema.parse(req.body);

//         const user = await User.findOne({
//             email: data.email,
//         });

//         if (!user) {
//             return errorResponse(
//                 res,
//                 "Invalid email or password",
//                 401
//             );
//         }

//         const matched = await comparePassword(
//             data.password,
//             user.password
//         );

//         if (!matched) {
//             return errorResponse(
//                 res,
//                 "Invalid email or password",
//                 401
//             );
//         }

//         const token = generateToken(user._id.toString());

//         return successResponse(res, "Login successful", {
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 isVerified: user.isVerified,
//             },
//         });
//     }
// );

export const login = asyncHandler(
    async (req: Request, res: Response) => {
        const data = loginSchema.parse(req.body);

        console.log("Login Request:", data);

        const user = await User.findOne({
            email: data.email,
        });

        console.log("User Found:", user);

        if (!user) {
            return errorResponse(
                res,
                "Invalid email or password",
                401
            );
        }

        const matched = await comparePassword(
            data.password,
            user.password
        );

        console.log("Password Matched:", matched);

        if (!matched) {
            return errorResponse(
                res,
                "Invalid email or password",
                401
            );
        }

        const token = generateToken(user._id.toString());

        return successResponse(res, "Login successful", {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        });
    }
);


/**
 * Current User
 */
export const me = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        return successResponse(
            res,
            "Current user",
            req.user
        );
    }
);

/**
 * Logout
 */
export const logout = asyncHandler(
    async (_req: Request, res: Response) => {
        return successResponse(
            res,
            "Logout successful"
        );
    }
);