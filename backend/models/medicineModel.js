import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    strength:{
        type: String,
        required:true,
    },
    manufacturer:{
        type: String,
        required:true,
    },
    stock:{
        type: Number,
        required: true,
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("medicines", medicineSchema);
