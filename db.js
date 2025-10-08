import mongoose from "mongoose";

const mongoURL='mongodb://127.0.0.1:27017/project'

export const connectDB=async ()=>{
    mongoose.connect(mongoURL)
    console.log('dbconnected');
    
}

