import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
        type: String,
    },
    slug:{
      type:String
    },
    category: {
      type:mongoose.ObjectId,
      ref:"medicinecategories"
    },
    price: {
      type: Number,
    },
    discountprice:{
      type:Number,
    },
    rating:{
      type: Number
    },
    description:{
      type: String
    },
    strength:{
        type: String,
    },
    manufacturer:{
        type: String,
    },
    stock:{
        type: Number,
    },
    medicineimg:{
      type:String,
    }

  },
  { timestamps: true }
);

export default mongoose.model("products", medicineSchema);
