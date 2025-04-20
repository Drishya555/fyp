import userModel from '../models/userModel.js'
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js'
import docmodel from '../models/doctorModel.js';
import pharmacistModel from '../models/pharmacistModel.js';
import hospitalModel from '../models/hospitalModel.js';
import exp from 'constants';


export const registerController = async(req,res) =>{
    try {
        const {name, email, password} = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email is already taken",
      });
    }
    const hashedPassword = await hashPassword(password);

    const resetToken = crypto.randomBytes(32).toString("hex");

    const user = await new userModel({
        name,
        email,
        password: hashedPassword,
        resetToken
    }).save();

    res.status(201).send({
        success: true,
        message: "User registered successfully",
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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in either user or doctor collection
    const user = await userModel.findOne({ email });
    const doctor = await docmodel.findOne({ email });
    const pharmacy = await pharmacistModel.findOne({ email });
    const hospital = await hospitalModel.findOne({ email });

    // If neither user nor doctor exists
    if (!user && !doctor && !pharmacy && !hospital) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Determine if the login is for a user or a doctor
    const account = user || doctor || pharmacy || hospital;

    // Compare passwords
    const match = await comparePassword(password, account.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = await JWT.sign({ _id: account._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send response based on account type
    const responseData = {
      success: true,
      message: "Login successful",
      user: {
        userid: account._id,
        name: account.name,
        email: account.email,
        address: account.address || "",
        role: account.role || (user ? "user" : "doctor"), // Set role based on account type
        ...(doctor && { licenseNo: doctor.licenseNo, image: doctor.image }), // Include doctor-specific fields
      },
      token,
    };

    res.status(200).send(responseData);
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

  const user = await userModel.findById(id);

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

    const updatedImage = await userModel.findByIdAndUpdate(
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


export const getSelectedUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}





export const editUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Validate enum fields if they're being updated
    if (updates.sex && !["Male", "Female", "Other"].includes(updates.sex)) {
      return res.status(400).send({
        success: false,
        message: "Invalid value for sex field",
      });
    }

    if (updates.blood && !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(updates.blood)) {
      return res.status(400).send({
        success: false,
        message: "Invalid value for blood field",
      });
    }

    // Validate age if being updated
    if (updates.age && (isNaN(updates.age) || updates.age < 0 || updates.age > 120)) {
      return res.status(400).send({
        success: false,
        message: "Age must be a valid number between 0 and 120",
      });
    }

    // Don't allow updating email if it's already taken by another user
    if (updates.email && updates.email !== user.email) {
      const emailExists = await userModel.findOne({ email: updates.email });
      if (emailExists) {
        return res.status(409).send({
          success: false,
          message: "Email is already taken by another user",
        });
      }
    }

    // Don't allow changing role through this endpoint (role changes should be admin-only)
    if (updates.role) {
      delete updates.role;
    }

    // Don't allow direct password updates (use separate password reset endpoint)
    if (updates.password) {
      delete updates.password;
    }

    // Update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password from the returned user data

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};