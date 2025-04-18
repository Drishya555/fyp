import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  vitals: {
    heartRate: {
      current: Number,
      history: [{
        value: Number,
        min: Number,
        max: Number,
        date: { type: Date, default: Date.now }
      }]
    },
    bloodPressure: {
      current: {
        systolic: Number,
        diastolic: Number
      },
      history: [{
        systolic: Number,
        diastolic: Number,
        date: { type: Date, default: Date.now }
      }]
    }
  },
  // Reference prescriptions instead of direct medications
  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prescription"
  }],
  // Reference appointments instead of embedding them
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  }],
  timeline: [{
    type: {
      type: String,
      enum: ["appointment", "diagnosis", "test", "procedure"],
      required: true
    },
    date: Date,
    title: String,
    details: String,
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    relatedAppointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    },
    relatedPrescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription"
    },
    metadata: mongoose.Schema.Types.Mixed
  }],
  allergies: [String],
  diagnoses: [{
    name: String,
    date: Date,
    diagnosedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    notes: String
  }],
  testResults: [{
    name: String,
    date: Date,
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    results: String,
    fileUrl: String
  }]
}, { timestamps: true });

export default mongoose.model("MedicalRecord", medicalRecordSchema);