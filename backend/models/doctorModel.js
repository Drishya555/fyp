import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "users"
    },
    specialization: {
      type: String,
      required: true,
    },
    licenseNo: {
      type: String,
    },
    hospital: {
      type: mongoose.ObjectId,
      ref:"Hospitals"
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("doctors", doctorSchema);
