const express = require("express");
const {getProfile, LoginUser, RegisterUser, updateProfile} = require("../Controllers/userController.js");
const Protect = require("../MidleWare/authMiddleWare.js");
const authUser = require("../MidleWare/authUser.js");
const upload = require("../multer.js");
const { getReviews, reviews } = require("../Controllers/ratingController.js");

const userRouter = express.Router();


userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);
userRouter.get("/get", authUser, getProfile);
userRouter.post("/update-profile", upload.single('image'),authUser, updateProfile);

// Rating Routes

userRouter.post("/review", reviews);
userRouter.get("/getreview", getReviews);

module.exports = userRouter;