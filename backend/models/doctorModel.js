import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User"
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
    }
  },
  { timestamps: true }
);

export default mongoose.model("doctors", doctorSchema);
