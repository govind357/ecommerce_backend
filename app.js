
import express from "express";
const app=express()
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectDB } from "./db.js";
import adminrouter from "./routers/admin.js";
import productRout from "./routers/public.js";
import router from "./routers/userRouter.js";
import cors from 'cors'
app.use(cors({
  origin:"http://localhost:5173",
  
  credentials:true
}))
app.use(express.json())

app.use(session({
  secret: "mySuperSecretKey",  // used to sign the session ID
  resave: false,               // don’t save session if nothing changes
  saveUninitialized: false,    // don’t create empty sessions
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/project",
  
    collectionName: "sessions" // collection name
  }),
  cookie: { maxAge: 1000 * 60 * 60}    // true only if HTTPS
}));

app.use("/uploads",express.static("uploads"))

connectDB()
app.use('/',productRout)
app.use('/user/',router)
app.use('/admin',adminrouter)
app.listen(3000,()=>console.log('serverrunning')
)