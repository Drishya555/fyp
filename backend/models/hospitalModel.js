import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    required: true,
    },
    address: {
      type: String,
      required: true,
    },
    licenseNo: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("hospitals", hospitalSchema);
