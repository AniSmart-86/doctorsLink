const mongoose = require("mongoose");





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
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAACUCAMAAADvY+hPAAAAMFBMVEXk5ueutLff4uOorrLn6eqrsbTZ3N3GyszAxce4vcCxt7rKztDq7O3R1Nbc3uC9wsQ76hoEAAAEXklEQVR4nO2c2Y7rIAxAAxgIW/L/f3tJ0s5NO+mELTaVcp6q0TwcWWAW4wzDzc3Nzc3Nzc3Nzc3NTa8AeABqiVQWUz4Fp7V2IUx8+0vPAFdhNEzIFSEEMzqooWNrPzljpWR7orqdHe/U2vPZslfhpzez4+Cp/Q7gszgUfmgL3VusgbvjEO+sretqXIMyJ8ar9dxRqH04C/Iz1KEbaZ1kvCActeuDMVk5So89RBrmDOU4PjS1cFTOiXIn0rnKcXgQS4PLVo6RJs0eoPKNFyZCaW+LlKWhU4axLMxxHlIFGkKhckQROfO8zPwS6JnIORQrR2miQJdNwAeGYkRDEDXOUhFIF+a5H2Z8Z1AVo3nB4i8sMNcpU+RobmqdDUdWrllPnkzYzunnqU+IgOxcsQY+kdiZY6rMdCu4ykNtplsQyJPQVS2CD2fkAV0/BdEzdOYFwQdG3LvS2hVlxeA6t0gbzOI6txgaTH6hM/tGZ9yF8Bvj3EQZeTx/Yd6AlPrJKbj5+SvXwZI73Hekw80bdZcbGwL5LqnJ/hlXuck5xSI7F9RR3pHYZbeiQsor6OfuBvcbFvt+o37XL2fse6TyWsqPM3J2Xpx59b0otvIw+MrBQVGsB1V5z4+vPNTNQol85n5Sk+4ketJ4UFEfpHpbUFqhZzRJY8MX39oRvoYoPGKRVY5XZ160JbVUE3CTLql5C4oS7F46f09K+7RnJVeaYG/0C9BZa7joQHnIq1N0ohzHdNoT14gNvTzdhpCWp6Uhzhh7gKccw2VvT82DPLEWFvucfQp4/aEDYQ1x3GL4voK8AtyZ42BLZrrt9gAetBXvDSrC6tCr8QIMfNJmaQB6YrQauuqXOAS8hyksKL78pvZJADZ8ZPtFLfQnS/8dn1QIbulqW3AuBltNg++xMS8GlSs3Ghv5lTasNXOchvF/qDUfrP2CQZs43f5aVNa+vHnrJ6QWXvsF5Z+6O/G1Ly/OTDptPyj9q1/w3JuZMdBog+ejZZnCT29mZ/SlPC4dwSYOiA8IOWL2nMKgRlZfH5RixlrTAcKcfC45sZYGY0sNXplGxhvWXTwd46iwDYrGL0h2bU+hGusm3jHChKtmIwzaXmC8IOdrDre+yVPcT9LMtc/XMIytB/KbtW1dFEprhq6TZm37vzNuimqsx4bJusHj/TRp06pnBbi5dijvpEWbu2mYrspwRzSRRph9LzS4UgeOGeVVujbSMGEkjFcqr9WB4ytXjumYMQiUWV2Ztv5BWiHleTqvItUQWVqpLaqxtpIue/kDbd6Sl0oXJY82T5yLKWmXjVs5UkreS1Cluf9kl7kavGGtROY/NSY2ZvkbD0+2muwQmbOwA+XMfId1mDoh7xMuTVoaq8n5PBiEC69fMpBjRph7mIELGVul6u8ntEKmrystGmaakNFN3aLhvA3JayHxjm5PentTH1ljIb2NrJuhkb4U1jUXtCW1LZLwHPiLxFYF0KIfZOLY4BPvhqN3//8A8148lR8fEq4AAAAASUVORK5CYII=',
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

module.exports = doctorModel;