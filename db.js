import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const mongoURL =(process.env.MONGO_URL)

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('dbconnected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

