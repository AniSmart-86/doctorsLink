// import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import { mongoose } from "mongoose";
import cors from 'cors';
import userRoutes from "./Routes/userRoute.js"
import errorHandler from "./MidleWare/errorMiddleWare.js";
import cookieParser from "cookie-parser";
import connectCloudinary from "./config/cloudary.js";
import admin from "./Routes/adminRoute.js";
import userRouter from "./Routes/userRoute.js";

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-Type', 'AUthorization', 'token'],
}));

dotenv.config();

//MiddleWares
app.use(cookieParser ());
// app.use(cookieSession({keys: ["QeM7ZfPbEqipEwQl"]}));
// app.use(express.urlencoded({extended: false}));

// Routes
connectCloudinary()
app.use("/api/users", userRouter);
app.use("/api/admin", admin);




// app.get("/", (req, res)=>{
//     res.send("Home Page is working...")
// });

// Error MiddleWare
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log("database is connected")
    app.listen(PORT, ()=>{
        console.log(`server is connected successfully ${PORT}`)
    })
}).catch((err)=>console.log(err));
