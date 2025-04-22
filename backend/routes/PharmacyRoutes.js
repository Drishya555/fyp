import express from 'express';
import { addMedicineController, addNewMedicineCategory,getallcategories,deleteMedicineController,getAllMedicines,getMedicineBySlug ,getRandomProducts,registerPharmacistController, updateMedicineController} from '../controllers/pharmacyController.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/addmedicine',formidable(),addMedicineController)
router.post('/addnewmedicinecategory',addNewMedicineCategory)
router.get('/getallmedicines',getAllMedicines)
router.get('/getmedicinebyslug/:slug',getMedicineBySlug)
router.get('/getrandomproducts',getRandomProducts)
router.post('/addpharmacist', formidable(),registerPharmacistController)
router.put('/editmedicinecontroller/:id', formidable(), updateMedicineController);
router.delete('/deletemedicine/:id', deleteMedicineController);
router.get('/getallcategories', getallcategories);

export default router;