import express from 'express';
import { createappointment, deleteappointmentcontroller, getallappointment,getappointmentbydocidcontroller,getsingleappointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/createappointment', createappointment)
router.get('/viewallappointments',getallappointment )
router.get('/viewsingleappointment/:id',getsingleappointment)
router.get('/getappointmentbydoctor/:id',getappointmentbydocidcontroller)
router.put('/updateappointment/:id')
router.delete('/deleteappointment/:id',deleteappointmentcontroller)

export default router;