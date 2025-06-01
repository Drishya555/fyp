import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  vitals: {
    heartRate: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    date: Date
  },
  timeline: [{
    type: {
      type: String,
      enum: ["appointment", "test", "diagnosis", "treatment", "symptom", "medication", "other"],
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    title: String,
    details: String,
    doctor: String,
    location: String,
    duration: String,
    notes: String
  }],
    allergies: [{
  name: {
    type: String,
    required: true
  },
  reaction: String,
  severity: {
    type: String,
    enum: ["mild", "moderate", "severe", "life-threatening"],
    default: "mild"
  },
  notes: String
}]
}, { timestamps: true });

export default mongoose.model("MedicalRecord", medicalRecordSchema);