import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
    ref: "users",
    },
    licenseNo: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("pharmacists", pharmacistSchema);
