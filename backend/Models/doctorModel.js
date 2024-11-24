import { Schema, model, mongoose } from "mongoose";

const { ObjectId } = Schema;



const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [8, "Password must be up to 8 characters"],
      //   maxLength: [23, "Password must not be more than 23 characters"],
    },
    image: {
      type: String,
      required: true,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
  
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
      default: Date.now()
    },
    slot_booked: {
      type: Object,
      default: {},
    },
   
    address: {
      type: Object,
      required: true
      // address, state, country
    }
  },{minimize: false});



const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;