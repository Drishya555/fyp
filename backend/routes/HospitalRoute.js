import express from 'express';
import { registerHospital,getallHospitalController, getsinglehospitalController } from '../controllers/hospitalController.js';
const router = express.Router();
import formidable from "express-formidable";

router.post('/registerhospital',formidable(), registerHospital)
router.get('/getallhospitals', getallHospitalController)
router.get('/getsinglehospital/:id',getsinglehospitalController)
export default router;