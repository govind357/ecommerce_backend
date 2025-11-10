import mongoose, { SchemaTypes } from "mongoose";
const userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['user','admin'],default:'user'},
    status:{type:Boolean,default:true}
})

const users =mongoose.model('users',userschema)
export default users

