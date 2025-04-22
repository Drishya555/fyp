import express from 'express';
import { registerHospital,getallHospitalController, getsinglehospitalController,addreviewController, editHospitalController } from '../controllers/hospitalController.js';
const router = express.Router();
import formidable from "express-formidable";

router.post('/registerhospital',formidable(), registerHospital)
router.get('/getallhospitals', getallHospitalController)
router.get('/getsinglehospital/:id',getsinglehospitalController)
router.post('/addreview/:id',addreviewController)
router.put('/updatehospital/:id',formidable(), editHospitalController)
export default router;