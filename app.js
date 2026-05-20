import dotenv from 'dotenv'
dotenv.config();

import express from "express";
const app=express()

import session from "express-session";
import MongoStore from "connect-mongo";
import { connectDB } from "./db.js";
import adminrouter from "./routers/admin.js";
import productRout from "./routers/public.js";
import router from "./routers/userRouter.js";


import cors from 'cors'
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173"
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(express.json())
  
app.use(session({
  secret: process.env.SESSION_SECRET || "mySuperSecretKey",  // used to sign the session ID
  resave: false,               // don't save session if nothing changes
  saveUninitialized: false,    // don't create empty sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: "sessions" // collection name
  }),
  cookie: { maxAge: 1000 * 60 * 60}    // true only if HTTPS
}));

app.use("/uploads",express.static("uploads"))

connectDB()
app.use('/',productRout)
app.use('/user/',router)
app.use('/admin',adminrouter)
const port = process.env.PORT || 3000
console.log(`Server listening on port ${port}`)

app.listen(port, () => console.log('server running'))
