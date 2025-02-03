import userModel from '../models/userModel.js'
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import crypto from 'crypto';
import JWT from 'jsonwebtoken';

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
    const user = await userModel.findOne({ email });

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
        name: user.name,
        email: user.email,   // Include email
        address: user.address || "",  // Include address
        role: user.role || "user",    // Include role
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
