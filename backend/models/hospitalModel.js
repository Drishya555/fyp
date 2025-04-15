import mongoose from "mongoose";
import { type } from "os";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    required: true,
    },
    email: {
      type: String
    },
    password: {
      type: String
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
    },
    image:{
      type: String,
    },
    hospitaltype:{
      type: String,
    },
    price:{
      type: Number,
    },
    role:{
      type: String,
      default: "hospital",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
