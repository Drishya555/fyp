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
    bio:{
      type: String,
    },
    sex:{
      type: String,
    },
    blood:{
      type: String
    },
    nationality:{
      type: String
    },
    age:{
      type: Number
    },
    phone:{
      type: String
    },
    BMI:{
      type: String
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema); // Change from "Users" to "User"
