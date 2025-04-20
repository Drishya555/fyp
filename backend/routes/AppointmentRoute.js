import express from 'express';
import { createappointment, deleteappointmentcontroller, getallappointment,getappointmentbydocidcontroller,getsingleappointment,getappointmentbyuser} from '../controllers/appointmentController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/createappointment', createappointment)
router.get('/viewallappointments',getallappointment )
router.get('/viewsingleappointment/:id',getsingleappointment)
router.get('/getappointmentbydoctor/:id',getappointmentbydocidcontroller)
router.get('/getappointmentbyuser/:id',getappointmentbyuser)
router.put('/updateappointment/:id')
router.delete('/deleteappointment/:id',deleteappointmentcontroller)

export default router;