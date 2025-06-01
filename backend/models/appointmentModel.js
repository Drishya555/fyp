import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User"
    },
    doctor: {
      type: mongoose.ObjectId,
      ref: "Doctor",
    },
    date: {
      type: Date,
    },
    purpose: {
      type: String,
    },
    time: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending"
    },
    notes: {  
      type: String,
      default: "",  
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);