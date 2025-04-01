import hospitalModel from "../models/hospitalModel.js";
import cloudinary from '../config/cloudinary.js'


export const registerHospital = async(req,res) => {
    try {
        const {name, address, licenseNo, bio, rating, hospitaltype, price} = req.fields;
        const {image} = req.files;

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
            name, address, licenseNo, bio, rating, hospitaltype, image: imageurl, price
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