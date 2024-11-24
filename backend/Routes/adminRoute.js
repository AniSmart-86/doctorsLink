import express from "express";
import { addDoctor, loginAdmin } from "../Controllers/adminController.js";
import upload from "../multer.cjs";
import authAdmin from "../MidleWare/authAdmin.js";



const adminRoute = express.Router();

adminRoute.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRoute.post("/login", loginAdmin);

export default adminRoute;