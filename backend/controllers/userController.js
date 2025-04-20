import userModel from '../models/userModel.js'
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js'
import docmodel from '../models/doctorModel.js';
import pharmacistModel from '../models/pharmacistModel.js';
import hospitalModel from '../models/hospitalModel.js';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: 'mediaidapp@gmail.com',
    pass: 'ijro tsfg jxwh ujef',
  },
});

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      verified: false
    }).save();

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Email Verification</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering with us. Please use the following OTP to verify your email address:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; color: #2563eb; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This OTP will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br/>The MediAid Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send({
      success: true,
      message: "Registration successful. Please check your email for OTP.",
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).send({
        success: false,
        message: "Email already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).send({
        success: false,
        message: "OTP has expired",
      });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error verifying OTP",
      error,
    });
  }
};

export const resendOtpController = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).send({
        success: false,
        message: "Email already verified",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'New OTP for Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New OTP for Verification</h2>
          <p>Hello ${user.name},</p>
          <p>Here's your new OTP to verify your email address:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; color: #2563eb; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This OTP will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br/>The MediAid Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({
      success: true,
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error resending OTP",
      error,
    });
  }
};









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









export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save token to user
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Create reset link
    const resetLink = `http://localhost:5173/resetpw/${resetToken}`;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset</h2>
          <p>Hello ${user.name},</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If you didn't request this, please ignore this email. The link will expire in 15 minutes.</p>
          <p>Best regards,<br/>The MediAid Team</p>
          <p style="font-size: 12px; color: #6b7280;">Or copy and paste this link in your browser: ${resetLink}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in sending reset link",
      error,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user by token and check expiration
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error resetting password",
      error,
    });
  }
};



// Add this to your userController.js
export const verifyResetTokenController = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid or expired token",
      });
    }

    res.status(200).send({
      success: true,
      message: "Token is valid",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error verifying token",
      error,
    });
  }
};