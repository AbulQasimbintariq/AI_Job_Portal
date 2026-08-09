import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (
    fn: RequestHandler
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};


// import { Request, Response, NextFunction } from "express";

// type AsyncController = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => Promise<Response | void>;

// export const asyncHandler = (
//     fn: AsyncController
// ) => {
//     return (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ): void => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };

// import { Request, Response, NextFunction } from "express";

// type AsyncController = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => Promise<Response | void>;

// export const asyncHandler = (fn: AsyncController) => {
//     return (req: Request, res: Response, next: NextFunction): void => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };