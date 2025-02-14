import express from 'express';
import { addMedicineController, addNewMedicineCategory,getAllMedicines,getMedicineBySlug ,getRandomProducts} from '../controllers/pharmacyController.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/addmedicine',formidable(),addMedicineController)
router.post('/addnewmedicinecategory',addNewMedicineCategory)
router.get('/getallmedicines',getAllMedicines)
router.get('/getmedicinebyslug/:slug',getMedicineBySlug)
router.get('/getrandomproducts',getRandomProducts)
export default router;