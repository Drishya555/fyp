import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema(
  {
    specialization: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Specialization", specializationSchema);
