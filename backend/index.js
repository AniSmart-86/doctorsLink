// const cookieSession from "cookie-session";
const express = require("express");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const cors = require ('cors');
const userRoutes = require("./Routes/userRoute.js")
const errorHandler = require("./MidleWare/errorMiddleWare.js");
const cookieParser = require("cookie-parser");
// const connectCloudinary = require("./config/cloudary.js");
const admin = require("./Routes/adminRoute.js");
const userRouter = require("./Routes/userRoute.js");
const path = require("path");
const { connectCloudinary } = require("./Controllers/adminController.js");
// const { fileURLToPath } from "url";
dotenv.config();


const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads/")));

app.use(cors({
    origin: ['https://doctors-link.vercel.app', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-Type', 'AUthorization', 'token'],
}));


//MiddleWares
app.use(cookieParser ());
// app.use(cookieSession({keys: ["QeM7ZfPbEqipEwQl"]}));
// app.use(express.urlencoded({extended: false}));

// Routes
app.use("/api/users", userRouter);
app.use("/api/admin", admin);



// app.get("/", (req, res)=>{
    //     res.send("Home Page is working...")
    // });
    
    
    
    // Error MiddleWare
    app.use(errorHandler);
    
    const PORT = process.env.PORT || 5000;
    const MONGOURL = process.env.MONGO_URL;
    
    mongoose.connect(MONGOURL).then(()=>{
        console.log("database is connected")
        app.listen(PORT, ()=>{
            console.log(`server is connected successfully ${PORT}`)
        })
    }).catch((err)=>console.log(err));
    connectCloudinary()
