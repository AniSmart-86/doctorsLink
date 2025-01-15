const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const doctorModel = require('../Models/doctorModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
  fileFilter: (req, file, cb) => {
    try {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
    } catch (error) {
      cb(error);
    }
  },
});


const connectCloudinary = async () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
  }
  

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const image = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: 'Missing details!' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email!' });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'Password must be 8 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
    // const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: image.path,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      Date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: 'Doctor Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const getDoctors = async (req, res) => {
    try {
      const doctors = await doctorModel.find({});
      res.json({ success: true, doctors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to fetch doctors', error: error.message });
    }
  };


  const editDoctor = async(res, req)=>{
    try {
        const { id } = req.params;
    const { name, speciality, degree, experience, about, fees, address } = req.body;

    const updatedData =  { name, speciality, degree, experience, about, fees, address };
    if (req.file) updatedData.image = req.file.path; // Update image if uploaded

    const doctors = await doctorModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!doctors){ return res.status(404).json({ error: "Doctor Not Found" });}
    res.status(200).json({ message: "Doctor updated successfully", doctors });

    } catch (error) {
        console.error(error);
      res.status(500).json({ success: false, message: 'Unable to edit doctors', error: error.message });
    }
  }




  const deleteDoctor = async(res, req)=>{
    try {
        const { id } = req.params;
        const doctors = await doctorModel.findByIdAndDelete(id);
    
        if (!doctors) return res.status(404).json({ error: "Doctor not found" });
    
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Doctor" });
    }
  }




const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { addDoctor, loginAdmin, upload, connectCloudinary, getDoctors, editDoctor, deleteDoctor };
