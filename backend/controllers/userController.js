import userModel from '../models/userModel.js'
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js'
import docmodel from '../models/doctorModel.js';

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

    // If neither user nor doctor exists
    if (!user && !doctor) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Determine if the login is for a user or a doctor
    const account = user || doctor;

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
