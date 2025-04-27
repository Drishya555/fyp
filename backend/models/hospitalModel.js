import mongoose from "mongoose";

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
    reviews: [
      {
        user: {
          type: mongoose.ObjectId,
          ref: "User",
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      }
    ],
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
      default: 0,
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
    phone:{
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
