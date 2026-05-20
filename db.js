import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();


const mongoURL=(process.env.MONGO_URL)





export const connectDB=async ()=>{
   try{
    await mongoose.connect(mongoURL)
    console.log('dbconnected');
    
   }
   catch(err){
    console.error('erroe'+err)
   }
}

