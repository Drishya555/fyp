import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.ObjectId,
        ref: "users",
    },
    appointment: {
      type: mongoose.ObjectId,
      ref: "appointments",
    },
    doctor: {
      type: mongoose.ObjectId,
      ref: "doctors",
    },
    prescription:{
        type: String,
        required: true,
    },
    medication: [
        {
            medicineName:{
                type: String,
                required: true,
            },
            dosage:{
                type: String,
                required: true,
            },
            frequency:{
                type: String,
                required: true,
            },
            duration:{
                type: String,
                required: true,
            },
        }
    ]
    
    
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);
