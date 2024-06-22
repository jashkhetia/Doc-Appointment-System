const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "name is required" ],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  confirmPassword:{
    type: String,
    required:[true,"Confirm Password is Required"],
  },
  dob:{
    type: Date,
    required:[true,"Date of Birth is required"]
  },
  website:{
    type: String,
    required:[false, "Website is optional"]
  },
  agreement:{
    type: Boolean,
    required: [true, "You must agree to the terms and conditions"]
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification:{
    type: Array,
    default: [ ],
  },
  seennotification:{
    type: Array,
    default: [ ],
  },
  verified:{
    type: Boolean,
    default: false,
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;