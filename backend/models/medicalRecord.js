import mongoose from "mongoose";

const medicalSchema = new mongoose.Schema(
  {
    user: {
    type: mongoose.ObjectId,
    ref: "users",
    },
    doctor: {
      type: mongoose.ObjectId,
      ref: "doctors",
    },
    symptoms: [
        {
           symptomname:{
            type: String,
           } 
        }
    ],
    allergies:[
        {
            allergyName:{
             type: String,
            } 
         }
    ],
    prescription:{
      type: mongoose.ObjectId,
      ref:"prescriptions"
    },
    cured:{
        type: String,
        default: "False"
    },
    images:[
        {
            image: {
                type: String
            }
        }
    ],
    
  },
  { timestamps: true }
);

export default mongoose.model("medicalRecord", medicalSchema);
