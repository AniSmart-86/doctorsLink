import asynchandler from 'express-async-handler';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator'
import userModel from '../Models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';







// Register user
 const RegisterUser = async(req, res)=>{

    try {

        const {name, email, password} = req.body;

        // User validation
    if(!name || !email || !password) {
       return res.json({success: false, message: "please fill all required fields"})
    }
    
    
    if(!validator.isEmail(email)){
        return res.json({success: false, message: "please enter a valid email"})
    }
        // strong password
    if(password.length < 6) {
        return res.json({success: false, message: "password must be up to 6 characters"})
    
    }


//  Encrypt password before saving to DB

  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   
  

    const userData = {
        name,
        email,
        password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save();


    const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: '2d'})
    return res.json({success: true, token});


    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error.message})
        
    }

    
}

// API FOR LOGIN
const LoginUser = async(req, res)=>{

    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: "user does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
           return res.json({success: true, token})
            
        }else{
          return  res.json({success: false, message: "Wrong password or email"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


// API FOR USER PROFILE
const getProfile = async(req, res)=>{

try {
    
const { userId } = req.body
const userData = await userModel.findById(userId).select('-password')
res.json({success: true, userData})

} catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
}

}



// update user profile
const updateProfile = async(req, res)=>{


try {


    const {userId, name, phone, address, dob, gender } = req.body

    const imageFile = req.file

    if(!name || !phone || !address || !dob || !gender){
       return res.json({success: false, message: 'some data missing'})
    }

    await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address),dob,gender})
    

if(imageFile){
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
    const imageUrl = imageUpload.secure_url

    await userModel.findByIdAndUpdate(userId, {image:imageUrl})
}

res.json({success: true, message: "profile updated"})

} catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
}


}


export { RegisterUser, LoginUser, getProfile, updateProfile}
// check if user exists
// const userExists = await Use r.findOne({email});

// if(userExists) {
//     res.status(400)
//     throw new Error("Email has already been registered");
// }

// // create user
// const user = await User.create({
//     name,
//     email,
//     password
// });

// //function to generate token
// const token = generateToken(user._id);

// if(user){
//     const {_id, name, email, role} = user;
//     res.cookie("token", token, {
//         path: "/",
//         httpOnly: true,
//         expires: new Date(Date.now() + 1000 * 86400),
//         // secure: true,
//         // sameSite: none,
//     })

//     // send user data
//     res.status(201).json({
//         _id, name, email, role, token,
//     })
// }else{
//     res.status(400);
//     throw new Error("Invalid user data");
// }

// });






// // Login user
// export const LoginUser = asynchandler (async (req, res)=>{
//     const {email, password} = req.body;

//     // Validate admin
//     if (username === 'admin' && password === 'password') {
//       const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
//       res.json({ token });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
  

//     // Validate user
//     if(!email || !password){
//         res.status(400);
//         throw new Error("please add email and password");
//     }

//     //check if user exists
//     const user = await User.findOne({email});
// if(!user){
//     res.status(400);
//     throw new Error("User does not exist");
// }
//     //checking if password is correct
//     const passwordIsCorrect = await bcrypt.compare(password, user.password);

//     //Generate Token
//     const token = generateToken(user._id);
//    if(user && passwordIsCorrect){
//     const newUser = await User.findOne({email}).select("-password");
//     res.cookie("token", token, {
//         path: "/",
//         httpOnly: true,
//         expires: new Date(Date.now() + 1000 * 86400),
//         // secure: true,
//         // sameSite: none,
//     });

//     // send user data frontend
//     res.status(201).json(newUser);
// }else{
//     res.status(400);
//     throw new Error("Invalid email or pasword");
//    }
// });






// //Logging out User
// export const LogoutUser = asynchandler (async (req, res)=>{

//     res.cookie("token", "", {
//         path: "/",
//         httpOnly: true,
//         expires: new Date(0),
//         // secure: true,
//         // sameSite: none,
//     });
// res.status(200).json({
//     message: "Logged out successfully"
// })
// });




// // get user data
// export const GetUserData = asynchandler (async (req, res)=>{

//     const user = await User.findById(req.user._id).select("-password");

//     if(user){
//         res.status(200).json(user);

//     }else{
//         res.status(400);
//         throw new Error("User not found");
//     }

// });



// // Get login status
// export const LoginStatus = asynchandler (async (req, res)=>{
//     const token = req.cookies.token;

//     if(!token){
//        return res.json(false);
        
//     }

//     // verify Token
//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     if(verified){
//         return res.json(true);
//     }else{
//        return res.json(false);
//     }
// });


// // Update user
// export const UpdateUser = asynchandler (async (req, res)=>{
//     const user = await User.findById(req.user._id);

//     if(user){
//         const {name, phone, address} = user;
//         user.name = req.body.name || name;
//         user.phone = req.body.phone || phone;
//         user.address = req.body.address || address;

//         const UpdatedUser = await user.save();
//         res.status(200).json(UpdatedUser);
//     }else{
//         res.status(404);
//         throw new Error("User not found")
//     }
// });


// // update photo
// export const UpdatePhoto = asynchandler (async (req, res)=>{
// const { photo } = req.body;
// const user = await User.findById(req.user._id);
// user.photo = photo
// const UpdatedUser = await user.save();
//         res.status(200).json(UpdatedUser);
// });