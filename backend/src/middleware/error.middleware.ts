import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};
