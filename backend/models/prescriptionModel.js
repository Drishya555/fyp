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
    pharmacist:{
        type: mongoose.ObjectId,
        ref:"pharmacists",
    },
    medicine:{
        type: mongoose.ObjectId,
        ref:"medicines",
    },
    prescription:{
        type: String,
        required: true,
    },
    
    
  },
  { timestamps: true }
);

export default mongoose.model("prescriptions", prescriptionSchema);
