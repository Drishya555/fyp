import express from 'express';
import { getAllDoctors, addSpecialization, registerDocController, loginDocController, getallSpecialization, updatedocController, dochospcontroller, getDoctorbyId, addreviewcontroller, getthreereviewscontroller, updateDoctorProfileController, deleteDoctorController } from '../controllers/docControllers.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/registerdoctor', formidable(), registerDocController);
router.post('/logindoctor', loginDocController);
router.get('/getalldoctors', getAllDoctors);
router.post('/addnewspecialization', authenticateToken, addSpecialization);
router.get('/getallspecialization', getallSpecialization);
router.put('/updatedocdetails/:id', authenticateToken, updatedocController);
router.get('/getselecteddoc/:id', getDoctorbyId);
router.get('/getdoctorsbyhospital/:id', dochospcontroller);
router.delete('/:id', authenticateToken, deleteDoctorController);
router.put('/updatedoctor/:id', authenticateToken, formidable(), updateDoctorProfileController);
router.post('/addreview/:id', authenticateToken, addreviewcontroller);
router.get('/getthreereviews/:id', getthreereviewscontroller);

export default router;