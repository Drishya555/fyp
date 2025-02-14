import express from 'express';
import { addMedicineController, addNewMedicineCategory,getAllMedicines } from '../controllers/pharmacyController.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/addmedicine',formidable(),addMedicineController)
router.post('/addnewmedicinecategory',addNewMedicineCategory)
router.get('/getallmedicines',getAllMedicines)
export default router;