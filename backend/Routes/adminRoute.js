const express = require("express");
const { addDoctor, loginAdmin, upload, getDoctors, editDoctor, deleteDoctor } = require("../Controllers/adminController.js");
// const upload = require("../multer.js");
const authAdmin = require("../MidleWare/authAdmin.js");



const adminRoute = express.Router();

adminRoute.post("/add-doctor", upload.single("image"), addDoctor);
adminRoute.get("/get-doctors", getDoctors);
adminRoute.post("/login", loginAdmin);
adminRoute.put("/edit/:id", upload.single("image"), editDoctor);
adminRoute.delete("/delete/:id", deleteDoctor);


module.exports = adminRoute;