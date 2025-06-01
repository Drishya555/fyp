import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    // Existing fields
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String
    },
    specialization: [
      {
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Specialization"
        },
        percentage: {
          type: Number,
          default: 100
        }
      }
    ],
    licenseNo: {
      type: String,
    },
    hospital: {
      type: mongoose.ObjectId,
      ref: "Hospital"
    },
    reviews: [
      {
        user: {
          type: mongoose.ObjectId,
          ref: "User",
        },
        review: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
        },
      }
    ],
    freeslots: [
      {
        day: {
          type: String,
        },
        time: {
          type: String,
        },
        status: {
          type: String,
          default: "available",
        }
      }
    ],
    rating: {
      type: Number,
      default: 0,
    },
    about: {
      type: String,
    },
    experience: {
      type: String
    },
    totalPatients: {
      type: String
    },
    hourlyPrice: {
      type: String,
    },
    image: {
      type: String,
    },
    bgimage: {
      type: String,
    },
    role: {
      type: String,
      default: "doctor",
    },
    verified: {
      type: Boolean,
      default: false
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },

    location: {
      type: String,
      default: ""
    },
    username: {
      type: String,
      default: ""
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Locum", "Other"],
      default: "Full-time"
    },
    portfolio: {
      type: String,
      default: ""
    },
    skills: [{
      type: String
    }],
    careerProgression: [
      {
        year: String,
        role: String,
        description: String,
        company: String,
        achievements: [String]
      }
    ],
    notableCases: [
      {
        title: String,
        description: String,
        year: String,
        tags: [String]
      }
    ],
    performanceMetrics: [
      {
        category: String,
        score: Number
      }
    ],
    testimonials: [
      {
        author: String,
        position: String,
        text: String,
        rating: Number
      }
    ],
    availability: {
      type: String,
      enum: ["Available", "Limited", "Not Available"],
      default: "Available"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
