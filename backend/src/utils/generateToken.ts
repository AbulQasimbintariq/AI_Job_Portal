// import jwt from "jsonwebtoken";

// export const generateToken = (id: string): string => {
//     return jwt.sign(
//         { id },
//         process.env.JWT_SECRET as string,
//         {
//             expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//         }
//     );
// };

import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

export const generateToken = (id: string): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const expiresIn: StringValue =
        (process.env.JWT_EXPIRES_IN as StringValue) || "7d";

    return jwt.sign(
        { id },
        secret,
        {
            expiresIn,
        }
    );
};