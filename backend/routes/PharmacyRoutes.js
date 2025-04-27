import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import { 
  addMedicineController,
  addNewMedicineCategory,
  getallcategories,
  deleteMedicineController,
  getAllMedicines,
  getMedicineBySlug,
  getRandomProducts,
  registerPharmacistController,
  updateMedicineController
} from '../controllers/pharmacyController.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/addmedicine', authenticateToken, formidable(), addMedicineController);
router.post('/addnewmedicinecategory', authenticateToken, addNewMedicineCategory);
router.get('/getallmedicines', getAllMedicines);
router.get('/getmedicinebyslug/:slug', getMedicineBySlug);
router.get('/getrandomproducts', getRandomProducts);
router.post('/addpharmacist', formidable(), registerPharmacistController);
router.put('/editmedicinecontroller/:id', authenticateToken, formidable(), updateMedicineController);
router.delete('/deletemedicine/:id', authenticateToken, deleteMedicineController);
router.get('/getallcategories', getallcategories);

export default router;