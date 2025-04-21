import express from 'express';
import { loginController, registerController,updateImage,getall, getSelectedUser, editUserController, verifyOtpController, resendOtpController, forgotPasswordController, resetPasswordController, verifyResetTokenController } from '../controllers/userController.js';
import formidable from "express-formidable";

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgotpw')
router.put("/updateimg/:id", formidable(), updateImage)
router.get('/getselecteduser/:id', getSelectedUser)
router.get('/getall', getall)

router.put('/edituser/:id',editUserController)
router.post('/verify-otp', verifyOtpController);
router.post('/resend-otp', resendOtpController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post('/verify-reset-token', verifyResetTokenController);

export default router;