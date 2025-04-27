import express from 'express';
import { registerHospital, getallHospitalController, getsinglehospitalController, addreviewController, editHospitalController } from '../controllers/hospitalController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/registerhospital', formidable(), registerHospital);
router.get('/getallhospitals', getallHospitalController);
router.get('/getsinglehospital/:id', getsinglehospitalController);
router.post('/addreview/:id', authenticateToken, addreviewController);
router.put('/updatehospital/:id', authenticateToken, formidable(), editHospitalController);

export default router;