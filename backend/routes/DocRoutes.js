import express from 'express';
import { getAllDoctors, addSpecialization, registerDocController,loginDocController,getallSpecialization, updatedocController, dochospcontroller, getDoctorbyId,addreviewcontroller,getthreereviewscontroller, updateDoctorProfileController} from '../controllers/docControllers.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/registerdoctor',formidable(), registerDocController)
router.post('/logindoctor',loginDocController);
router.get('/getalldoctors', getAllDoctors);
router.post('/addnewspecialization',addSpecialization);
router.get('/getallspecialization',getallSpecialization);
router.put('/updatedocdetails/:id',updatedocController);
router.get('/getselecteddoc/:id',getDoctorbyId);
router.get('/getdoctorsbyhospital/:id',dochospcontroller);
router.put('/updatedoctor/:id',formidable(),updateDoctorProfileController);
router.post('/addreview/:id',addreviewcontroller);
router.get('/getthreereviews/:id', getthreereviewscontroller);

export default router;