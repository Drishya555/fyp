import mongoose from "mongoose";
import { type } from "os";

const doctorSchema = new mongoose.Schema(
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
    phone:{
      type:String
    },
    specialization: {
      type: mongoose.ObjectId,
      ref: "Specialization",
    },
    licenseNo: {
      type: String,
    },
    hospital: {
      type: mongoose.ObjectId,
      ref:"Hospitals"
    },
    reviews:[
      {
        user:{
          type:mongoose.ObjectId,
          ref:"users",
        },
        review:{
          type:String,
        }
      }
    ],
    rating: {
      type: Number,
    },
    about:{
      type: String,
    },
    experience:{
      type: String
    },
    totalPatients:{
      type:String
    },
    hourlyPrice:{
      type: String,
    },
    image:{
      type:String,
    },
    bgimage:{
      type:String,
    },
    role:{
      type: String,
      default: "doctor",
    },
    verified:{
      type:Boolean,
      default:false
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

export default mongoose.model("Doctor", doctorSchema);
