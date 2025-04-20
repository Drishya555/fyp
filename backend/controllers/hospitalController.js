import hospitalModel from "../models/hospitalModel.js";
import cloudinary from '../config/cloudinary.js'
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import crypto from 'crypto'

export const registerHospital = async(req,res) => {
    try {
        const {email, password, name, address, licenseNo, bio, rating, hospitaltype, price} = req.fields;
        const {image} = req.files;

        const existingHospital = await hospitalModel.findOne({ email });
            if (existingHospital) {
              return res.status(409).send({
                success: false,
                message: "Email is already taken",
              });
            }

        const hashedPassword = await hashPassword(password);
            
        const resetToken = crypto.randomBytes(32).toString("hex");


        let imageurl;

         if (image) {
              const result = await cloudinary.uploader.upload(image.path, {
                folder: "mediaid",
              });
              imageurl = result.secure_url;
            }
        

        const existinglicense = await hospitalModel.findOne({licenseNo});
        if(existinglicense){
            return res.status(400).send({
                success: false,
                message: "Hospital with this license already exists"
            })
        }

        const newHospital = new hospitalModel({
            name, address, licenseNo, bio, rating, hospitaltype, image: imageurl, price,email, password: hashedPassword,resetToken
        }).save();

        res.status(200).send({
            success: true,
            message: "Hospital registered successfully",
            hospital: newHospital
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured while registering hospital",
            error: error.message
        })
    }
}




export const getallHospitalController = async(req,res) =>{
    try {
        const hospitals = await hospitalModel.find({}).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "All hospitals fetched successfully",
            hospitals
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured while fetching hospital",
            error: error.message
        })
    }
}



export const getsinglehospitalController = async(req,res) =>{
    try {
        const {id} = req.params;
        const hospital = await hospitalModel.findById(id);
        res.status(200).send({
            success: true,
            message: "Hospital fetched successfully",
            hospital
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error occured while fetching hospital",
            error: error.message
        })
    }
}




export const addreviewController = async(req,res) =>{
    try {
        const { id } = req.params; // hospital ID
        const { userId, review, rating } = req.body;
    
        if (!userId || !review || rating === undefined) {
          return res.status(400).json({ error: "User ID, review and rating are required" });
        }
    
        const numRating = Number(rating);
        if (isNaN(numRating)) {
          return res.status(400).json({ error: "Rating must be a number" });
        }
    
        const hospital = await hospitalModel.findById(id);
        if (!hospital) return res.status(404).json({ error: "Hospital not found" });
    
        const existingReviewIndex = hospital.reviews.findIndex(
          r => r.user.toString() === userId
        );
    
        const newReview = {
          user: userId,
          review,
          rating: numRating
        };
    
        if (existingReviewIndex >= 0) {
          hospital.reviews[existingReviewIndex] = newReview;
        } else {
          hospital.reviews.push(newReview);
        }
    
        const total = hospital.reviews.reduce((sum, r) => sum + r.rating, 0);
        hospital.rating = total / hospital.reviews.length;
    
        await hospital.save();
        return res.json({
          success: true,
          message: "Review submitted successfully",
          averageRating: hospital.rating,
          totalReviews: hospital.reviews.length
        });
    
      } catch (error) {
        console.error("Hospital review error:", error);
        return res.status(500).json({ error: "Failed to submit review" });
      }
}