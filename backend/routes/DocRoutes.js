import express from 'express';
import { getAllDoctors, addSpecialization, registerDocController,loginDocController, updatedocController} from '../controllers/docControllers.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/registerdoctor',formidable(), registerDocController)
router.post('/logindoctor',loginDocController);
router.get('/getalldoctors', getAllDoctors);
router.post('/addnewspecialization',addSpecialization);
router.put('/updatedocdetails/:id',updatedocController);

export default router;