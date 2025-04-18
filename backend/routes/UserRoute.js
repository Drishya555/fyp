import express from 'express';
import { loginController, registerController,updateImage, getSelectedUser } from '../controllers/userController.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgotpw')
router.put("/updateimg/:id", formidable(), updateImage)
router.get('/getselecteduser/:id', getSelectedUser)

export default router;