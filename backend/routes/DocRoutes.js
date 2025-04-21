import express from 'express';
import { getAllDoctors, addSpecialization, registerDocController,loginDocController, updatedocController, dochospcontroller, getDoctorbyId,addreviewcontroller,getthreereviewscontroller} from '../controllers/docControllers.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/registerdoctor',formidable(), registerDocController)
router.post('/logindoctor',loginDocController);
router.get('/getalldoctors', getAllDoctors);
router.post('/addnewspecialization',addSpecialization);
router.put('/updatedocdetails/:id',updatedocController);
router.get('/getselecteddoc/:id',getDoctorbyId);
router.get('/getdoctorsbyhospital/:id',dochospcontroller);
router.post('/addreview/:id',addreviewcontroller);
router.get('/getthreereviews/:id', getthreereviewscontroller);

export default router;