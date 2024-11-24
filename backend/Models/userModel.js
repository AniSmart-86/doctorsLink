import { Schema, model, mongoose } from "mongoose";
import pkg from "bcryptjs";



const { ObjectId } = Schema;


const { genSalt: _genSalt, hash: _hash } = pkg
const userSchema = new mongoose.Schema(
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
      minLength: [6, "Password must be up to 6 characters"],
      //   maxLength: [23, "Password must not be more than 23 characters"],
    },

    image: {
      type: String,
      required: true,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
   
    address: {
      type: Object,
      default: {line1: 'kings way', line2: 'Enugu Nigeria'}
      // address, state, country
    },

    gender: {
      type: String,
      default: "Not Selected"
    },
    dob: {
      type: String,
      default: "Not Selected"
    },
    phone: {
      type: String,
      default: "234 456 4433"
    },
  });

 // Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await _genSalt(10);
  const hashedPassword = _hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;