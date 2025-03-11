import mongoose from "mongoose";

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
    freeslots:[
      {
        day:{
          type:String,
        },
        time:{
          type:String,
        },
        status:{
          type:String,
          default: "available",
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
