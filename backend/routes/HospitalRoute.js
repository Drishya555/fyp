import express from 'express';
import { registerHospital,getallHospitalController } from '../controllers/hospitalController.js';
const router = express.Router();
import formidable from "express-formidable";

router.post('/registerhospital',formidable(), registerHospital)
router.get('/getallhospitals', getallHospitalController)

export default router;