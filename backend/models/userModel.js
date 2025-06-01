import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    bio: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },
    blood: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    nationality: {
      type: String
    },
    age: {
      type: Number
    },
    phone: {
      type: String
    },
    BMI: {
      type: String
    },
    image: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_sLYpyeShGPeBAdNVXbZOIBYTN1Vv5qCBQ&s"
    },
    bgimage: {
      type: String
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);