import cloudinary from '../config/cloudinary.js'
import medicineModel from '../models/medicineModel.js'
import medicineCategoryModel from '../models/medicineCategoryModel.js';
import slugify from 'slugify';

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
  


