// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI as string);

//         console.log("✅ MongoDB Connected");
//     } catch (error) {
//         console.error("Database Error:", error);
//         process.exit(1);
//     }
// };

import mongoose from "mongoose";

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
    conn: null,
    promise: null,
};

global.mongooseCache = cached;

export const connectDB = async (): Promise<typeof mongoose> => {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    try {
        cached.conn = await cached.promise;

        console.log("✅ MongoDB Connected");

        return cached.conn;
    } catch (error) {
        cached.promise = null;

        console.error("❌ Database Error:", error);

        throw error;
    }
};

