import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User"
    },
    products: [
        { 
            product:{
                type: mongoose.ObjectId,
                ref: "Medicine",
            }  ,
            quantity:{
                type:Number
            }
        
        }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("carts", cartSchema);
