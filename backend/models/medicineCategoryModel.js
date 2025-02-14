import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    categoryName: {
        type: String,
    },    
  },
  { timestamps: true }
);

export default mongoose.model("medicinecategories", medicineSchema);
