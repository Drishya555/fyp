import doctorModel from '../models/doctorModel.js';
import specializationModel from '../models/specializationModel.js';
import cloudinary from '../config/cloudinary.js'
import docmodel from '../models/doctorModel.js'
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import crypto from 'crypto';
import JWT from 'jsonwebtoken';

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel
            .find()
            .populate("specialization", "specialization")
            .populate("hospital", "name")

        res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            doctors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching doctors",
            error: error.message,
        });
    }
};

export const getSelectedDocController = async (req, res) => {
  try {
    const {id} = req.params;
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

      res.status(200).json({
          success: true,
          message: "Doctors fetched successfully",
          doctor,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error fetching doctors",
          error: error.message,
      });
  }
};




export const addSpecialization = async(req,res) =>{
    try {
        const {specialization} = req.body;
         const doctor = await new specializationModel({
                specialization
            }).save();
        
        res.status(200).send({
            success: true,
            message: "Specialization added",
            doctor
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Specialization failed to add",
            
        })
    }
}

export const updatedocController = async (req, res) => {
  try {
      const { id } = req.params; // Doctor ID
      const updateData = req.body;

      const existingDoctor = await docmodel.findById(id);
      if (!existingDoctor) {
          return res.status(404).send({
              success: false,
              message: "Doctor not found",
          });
      }

      // Check if the request is to update a slot's status
      if (updateData.slotId && updateData.status) {
          // Find the slot in the freeslots array
          const slotIndex = existingDoctor.freeslots.findIndex(
              (slot) => slot._id.toString() === updateData.slotId
          );

          if (slotIndex === -1) {
              return res.status(404).send({
                  success: false,
                  message: "Slot not found",
              });
          }

          // Update the status of the specific slot
          existingDoctor.freeslots[slotIndex].status = updateData.status;

          // Save the updated doctor document
          const updatedDoctor = await existingDoctor.save();

          return res.status(200).send({
              success: true,
              message: "Slot status updated successfully",
              doctor: updatedDoctor,
          });
      }

      // Otherwise, proceed with the general update
      const updatedDoctor = await docmodel.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
      });

      res.status(200).send({
          success: true,
          message: "Doctor updated successfully",
          doctor: updatedDoctor,
      });
  } catch (err) {
      console.error("Error updating doctor:", err);
      res.status(500).send({
          success: false,
          message: "Failed to update doctor",
          error: err.message,
      });
  }
};



export const getDoctorbyId = async(req,res) =>{
  try {
    const {id} = req.params;
    const doctor = await docmodel.findById(id).populate('specialization', 'specialization').populate('hospital', 'name image');
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Doctor fetched successfully",
      doctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching doctor by ID",
      error: error.message,
    })
    
  }
}


export const registerDocController = async(req,res) =>{
    try {
        const {name, email, password, phone,licenseNo, hospital} = req.fields;
        const {image} = req.files;

        let imageurl;

         if (image) {
              const result = await cloudinary.uploader.upload(image.path, {
                folder: "mediaid",
              });
              imageurl = result.secure_url;
            }
        

    const existingUser = await docmodel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email is already taken",
      });
    }
    const hashedPassword = await hashPassword(password);

    const resetToken = crypto.randomBytes(32).toString("hex");

    const user = await new docmodel({
        name,
        email,
        password: hashedPassword,
        resetToken,
        phone:phone,
        licenseNo:licenseNo,
        image:imageurl,
        hospital
    }).save();

    res.status(201).send({
        success: true,
        message: "Doctor registered successfully",
        user,
      });
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
    }

}

export const loginDocController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await docmodel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        doctorid: user._id,
        name: user.name,
        email: user.email,   // Include email
        address: user.address || "",  // Include address
        role: user.role || "user",    // Include role
        verified: user.verified || false,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};



export const updateImage = async (req, res) => {
  const { id } = req.params;
  const { image, bgimage } = req.files;

  const user = await docmodel.findById(id);

  let imageUrl;
  let bgimageUrl;
  try {
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "mediaid",
      });
      imageUrl = result.secure_url;
    }

    if (bgimage) {
      const result = await cloudinary.uploader.upload(bgimage.path, {
        folder: "mediaid",
      });
      bgimageUrl = result.secure_url;
    }

    const updatedImage = await docmodel.findByIdAndUpdate(
      id,
      {
        image: imageUrl,
        bgimage: bgimageUrl
      },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedImage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const dochospcontroller = async(req,res) =>{
  try {
    
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching doctors by hospital",
      error: error.message,
    })
  }
}



export const addreviewcontroller = async (req, res) => {
  try {
    const { id } = req.params; // Doctor ID
    const { userId, review, rating } = req.body;

    // Basic validation
    if (!userId || !review || rating === undefined) {
      return res.status(400).json({ error: "User ID, review and rating are required" });
    }

    const numRating = Number(rating);
    if (isNaN(numRating)) {
      return res.status(400).json({ error: "Rating must be a number" });
    }

    const doctor = await docmodel.findById(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Check for existing review
    const existingReviewIndex = doctor.reviews.findIndex(
      r => r.user.toString() === userId
    );

    const newReview = {
      user: userId,
      review,
      rating: numRating
    };

    // Update or add review
    if (existingReviewIndex >= 0) {
      doctor.reviews[existingReviewIndex] = newReview;
    } else {
      doctor.reviews.push(newReview);
    }

    // Calculate new average (safe with default 0)
    const total = doctor.reviews.reduce((sum, r) => sum + r.rating, 0);
    doctor.rating = total / doctor.reviews.length;

    await doctor.save();
    return res.json({ 
      success: true,
      message: "Review submitted successfully",
      averageRating: doctor.rating,
      totalReviews: doctor.reviews.length
    });

  } catch (error) {
    console.error("Review submission error:", error);
    return res.status(500).json({ error: "Failed to submit review" });
  }
};



export const getthreereviewscontroller = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await docmodel.findById(id).populate("reviews.user", "name");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Get the last three reviews
    const reviews = doctor.reviews.slice(-3);

    res.status(200).json({
      success: true,
      message: "Last three reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
}