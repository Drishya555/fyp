import cloudinary from '../config/cloudinary.js'
import medicineModel from '../models/medicineModel.js'
import pharmacistModel from '../models/pharmacistModel.js'
import medicineCategoryModel from '../models/medicineCategoryModel.js';
import slugify from 'slugify';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import crypto from 'crypto';

export const addNewMedicineCategory = async(req,res) =>{
    try {
        const {categoryName} = req.body;
        const newcat = await new medicineCategoryModel({
            categoryName
        }).save()

        res.status(200).send({
            success: true,
            message: "New category added",
            newcat
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error adding new category",
            error: error.message
        })

    }
}



export const getAllMedicines = async (req, res) => {
    try {
      const medicines = await medicineModel
        .find()
        .populate("category", "categoryName"); 
  
      res.status(200).json({
        success: true,
        message: "Medicines fetched successfully",
        medicines,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching medicines",
        error: error.message,
      });
    }
  };


export const addMedicineController = async(req,res) =>{
    try {
        const {name, category, price, discountprice, rating, description, strength, manufacturer, stock } = req.fields
        const {medicineimg} = req.files
        let imageUrl;

        if(medicineimg){
            const result = await cloudinary.uploader.upload(medicineimg.path, {
                    folder: "mediaid",
                  });
            imageUrl = result.secure_url;
        }


        const newmedicine = await new medicineModel({
            name, 
            slug:slugify(name, { lower: true }),
            category, 
            price, 
            discountprice,
            rating, 
            description, 
            strength, 
            manufacturer, 
            stock,
            medicineimg: imageUrl
        }).save()


        res.status(200).send({
            success: true,
            message: "Medicine added successfully",
            newmedicine
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error adding medicine successfully",
            error: error.message
        })
    }
}


export const getMedicineBySlug = async (req,res) =>{
    try {
        const product = await medicineModel.findOne({ slug: req.params.slug }).populate("category", "categoryName") 
        ;
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      }
}


export const getRandomProducts = async (req, res) => {
    try {
      const products = await medicineModel.find().limit(4).populate("category", "categoryName");
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      res.json({ products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  




  export const registerPharmacistController = async(req,res) =>{
      try {
          const {name, email, password, phone,licenseNo} = req.fields;
          const {image} = req.files;
  
          let imageurl;
  
           if (image) {
                const result = await cloudinary.uploader.upload(image.path, {
                  folder: "mediaid",
                });
                imageurl = result.secure_url;
              }
          
  
              const pharmacists = await pharmacistModel.findOne({ email });
              const doctors = await doctorModel.findOne({ email });
              const users = await userModel.findOne({ email });
              
              const existingUser = pharmacists || doctors || users;
              
              if (existingUser) {
                return res.status(409).send({
                  success: false,
                  message: "Email is already taken",
                });
              }
              

      const hashedPassword = await hashPassword(password);
  
      const resetToken = crypto.randomBytes(32).toString("hex");
  
      const pharmacist = await new pharmacistModel({
          name,
          email,
          password: hashedPassword,
          resetToken,
          phone:phone,
          licenseNo:licenseNo,
          image:imageurl,
      }).save();
  
      res.status(201).send({
          success: true,
          message: "Pharmacist registered successfully",
          pharmacist,
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
  