import express from 'express';
import { loginController, registerController, updateImage, getall, getSelectedUser, editUserController, verifyOtpController, resendOtpController, forgotPasswordController, resetPasswordController, verifyResetTokenController, changePasswordController, deleteAccountController } from '../controllers/userController.js';
import formidable from "express-formidable";
import authenticateToken from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgotpw');
router.put("/updateimg/:id", formidable(), authenticateToken, updateImage); 
router.get('/getselecteduser/:id', authenticateToken, getSelectedUser); 
router.get('/getall', authenticateToken, getall); 
router.put('/edituser/:id', authenticateToken, editUserController); 
router.post('/verify-otp', verifyOtpController);  
router.post('/resend-otp', resendOtpController); 
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post('/verify-reset-token', verifyResetTokenController);
router.post("/changepassword", authenticateToken, changePasswordController);
router.delete("/deleteaccount",authenticateToken,deleteAccountController);

export default router;
