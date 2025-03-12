import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "users"
    },
    doctor: {
      type: mongoose.ObjectId,
      ref: "doctors",
    },
    date: {
      type: Date,
    },
    purpose: {
      type: String,
    },
    time:{
        type: Date,
    },
    status: {
      type: String,
      default: "Pending"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
