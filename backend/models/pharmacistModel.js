import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema(
  {
   name: {
         type: String,
         required: true,
       },
    email: {
         type: String,
         required: true,
         unique: true,
       },
    password: {
         type: String,
         required: true,
       },
    address: {
         type: String,
       },
    phone:{
         type:String
       },
    specialization: {
         type: mongoose.ObjectId,
         ref: "Specialization",
       },
    licenseNo: {
         type: String,
       },
    hospital: {
         type: mongoose.ObjectId,
         ref:"Hospitals"
       },
       totalPatients:{
         type:String
       },
       
       image:{
         type:String,
       },
       role:{
         type: String,
         default: "pharmacist",
       },
       verified:{
         type:Boolean,
         default:false
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

export default mongoose.model("pharmacists", pharmacistSchema);
