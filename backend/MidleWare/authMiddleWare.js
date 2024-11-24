import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js';






 const Protect = asyncHandler (async (req, res, next) =>{
 
try {
    const token = req.cookies.token;
    if(!token){
        res.status(401);
        throw new Error("Not authorized, please login");
    }

    // verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if(!user){
        res.status(401);
        throw new Error("user not found");
    }else{
        req.user = user;
        next();
    }
    
} catch (error) {
  next(error);
}



});


//ADMIN ONLY

export const AdminOnly = asyncHandler(async (req, res, next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(401)
        throw new Error("Not authorised, Admin only")
    };
});


export default Protect