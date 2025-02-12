import express from 'express';
import { loginController, registerController,updateImage } from '../controllers/authControllers.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgotpw')
router.put("/updateimg/:id", formidable(), updateImage)


export default router;