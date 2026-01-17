import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()

export const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
        return res;
    } catch (error) {
        console.log("Database connection failed", error);
        return error;
    }
}